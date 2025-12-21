# Convex 백엔드 가이드

대한금융 프로젝트의 Convex 서버리스 백엔드 가이드입니다.

## 디렉토리 구조

```text
convex/
├── _generated/           # 자동 생성 파일 (수정 금지)
├── actors/              # AI 배우 (애널리스트, 감독관, 고객)
├── auth/                # 관리자 인증
├── briefings/           # 브리핑
├── columns/             # 칼럼
├── notifications/       # 알림 발송
├── openai/              # OpenAI 연동
├── subscribers/         # 구독자
└── schema.ts            # DB 스키마 정의
```

---

## CQRS 패턴

도메인별로 파일을 분리하여 Command Query Responsibility Segregation 패턴을 적용합니다:

```text
convex/actors/
├── query.ts      # 공개 쿼리 함수
├── mutation.ts   # 공개 뮤테이션 함수
├── action.ts     # HTTP 액션 및 외부 API 연동
└── internal.ts   # 내부 쿼리/뮤테이션
```

### Query (query.ts)

읽기 전용 작업, 사이드 이펙트 없음:

```typescript
// convex/actors/query.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    role: v.optional(v.union(v.literal("analyst"), v.literal("supervisor"), v.literal("customer"))),
  },
  handler: async (ctx, args) => {
    if (args.role) {
      return await ctx.db
        .query("actors")
        .withIndex("by_role", (q) => q.eq("role", args.role!))
        .collect();
    }
    return await ctx.db.query("actors").collect();
  },
});
```

### Mutation (mutation.ts)

쓰기 작업 (생성, 수정, 삭제):

```typescript
// convex/actors/mutation.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    actorId: v.string(),
    name: v.string(),
    role: v.union(v.literal("analyst"), v.literal("supervisor"), v.literal("customer")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("actors", {
      ...args,
      isActive: true,
      version: 1,
    });
  },
});
```

### Action (action.ts)

외부 API 호출, 복잡한 작업:

```typescript
// convex/openai/action.ts
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import OpenAI from "openai";

export const generateColumn = action({
  args: { systemPrompt: v.string(), marketData: v.string() },
  handler: async (ctx, args) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: args.systemPrompt }],
    });
    return JSON.parse(response.choices[0]?.message?.content || "{}");
  },
});
```

### Internal (internal.ts)

클라이언트에 노출되지 않는 내부 함수:

```typescript
// convex/subscribers/internal.ts
import { internalQuery, internalMutation } from "../_generated/server";

export const listActive = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("subscribers")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
  },
});
```

---

## 프론트엔드에서 사용

### Query 사용

```tsx
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ActorList() {
  const actors = useQuery(api.actors.query.list, { role: "analyst" });

  if (actors === undefined) {
    return <Loading />;
  }

  return (
    <ul>
      {actors.map((actor) => (
        <li key={actor._id}>{actor.name}</li>
      ))}
    </ul>
  );
}
```

### Mutation 사용

```tsx
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function CreateActor() {
  const createActor = useMutation(api.actors.mutation.create);

  const handleSubmit = async () => {
    await createActor({ actorId: "analyst_kim", name: "김애널", role: "analyst" });
  };

  return <button onClick={() => void handleSubmit()}>생성</button>;
}
```

### Action 사용

```tsx
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

function GenerateColumn() {
  const generateColumn = useAction(api.openai.action.generateColumn);

  const handleGenerate = async () => {
    const result = await generateColumn({
      systemPrompt: "...",
      marketData: "...",
    });
    console.log(result);
  };

  return <button onClick={() => void handleGenerate()}>칼럼 생성</button>;
}
```

---

## 환경 변수

Convex 대시보드 > Settings > Environment Variables에서 설정:

```env
OPENAI_API_KEY=           # OpenAI API 키
RESEND_API_KEY=           # Resend 이메일 API 키
EMAIL_FROM=               # 발신자 이메일
TELEGRAM_BOT_TOKEN=       # 텔레그램 봇 토큰
NEXT_PUBLIC_BASE_URL=     # 사이트 URL
CONVEX_DEV_MODE=          # 개발 모드 ("true" 시 OTP 68686868)
```

---

## 스키마 정의

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  actors: defineTable({
    actorId: v.string(),
    name: v.string(),
    role: v.union(v.literal("analyst"), v.literal("supervisor"), v.literal("customer")),
    isActive: v.boolean(),
  })
    .index("by_actorId", ["actorId"])
    .index("by_role", ["role"]),
});
```

---

## 주의사항

1. **CQRS 패턴 준수**: 쿼리와 뮤테이션을 반드시 분리
2. **타입 안전성**: Convex는 자동으로 타입을 생성하므로 `api`에서 import하여 사용
3. **인덱스 활용**: 자주 조회하는 필드는 인덱스를 정의하여 성능 최적화
4. **Internal 함수**: 클라이언트에 노출하면 안 되는 함수는 `internalQuery/internalMutation/internalAction` 사용
5. **외부 API**: 외부 API 호출은 반드시 action 사용 (mutation에서는 불가)
