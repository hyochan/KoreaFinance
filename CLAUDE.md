# 대한금융 (KoreaFinance) 코드베이스 가이드

## 프로젝트 개요

AI 기반 금융 브리핑 플랫폼. 가상 애널리스트가 매일 금융 뉴스를 분석하여 브리핑을 제공.

**도메인**: 대한금융.com (korea-finance.vercel.app)

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS 4
- **Backend**: Convex (serverless database + functions)
- **AI**: OpenAI GPT-4
- **Email**: Resend
- **Notifications**: Telegram Bot
- **Package Manager**: Bun

---

## 카테고리 및 애널리스트

### 브리핑 카테고리

| 카테고리        | ID             | 설명        |
| --------------- | -------------- | ----------- |
| 한국주식        | korean_stock   | 코스피/코스닥 |
| 미국주식        | us_stock       | S&P500/나스닥 |
| 비트코인        | bitcoin        | 암호화폐     |
| 금리            | interest_rate  | 채권/통화정책 |
| 환율            | exchange_rate  | 외환         |
| 이슈            | issue          | 시사/정책    |

### AI 배우 (Actors)

3가지 역할의 AI 배우:
- **analyst**: 금융 칼럼을 작성하는 애널리스트
- **supervisor**: 칼럼을 리뷰하고 피드백하는 감독관
- **customer**: 발행된 칼럼에 반응하는 커뮤니티 멤버

---

## 디렉토리 구조

```text
/
├── app/                    # Next.js App Router
│   ├── admin/              # 관리자 페이지
│   │   ├── actors/         # 배우 관리
│   │   ├── columns/        # 칼럼 관리
│   │   ├── briefings/      # 브리핑 관리
│   │   └── subscribers/    # 구독자 관리
│   ├── briefings/          # 브리핑 목록/상세
│   └── subscribe/          # 구독 페이지
├── convex/                 # Convex 백엔드
│   ├── schema.ts           # 데이터베이스 스키마
│   ├── actors.ts           # 배우 CRUD
│   ├── columns.ts          # 칼럼 CRUD
│   ├── briefings.ts        # 브리핑 CRUD
│   ├── subscribers.ts      # 구독자 CRUD
│   ├── auth.ts             # OTP 인증
│   ├── openai.ts           # OpenAI 연동 (actions)
│   └── notifications.ts    # 알림 발송 (actions)
├── components/             # React 컴포넌트
├── lib/                    # 라이브러리
│   └── types/              # TypeScript 타입
└── public/                 # 정적 파일
```

---

## 개발 명령어

```bash
# 개발 서버
bun run dev

# 빌드
bun run build

# 린트
bun lint

# Convex 개발 모드
npx convex dev
```

---

## Convex 사용법

### 클라이언트에서 쿼리/뮤테이션 사용

```tsx
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

// 쿼리 (읽기)
const actors = useQuery(api.actors.list, { role: "analyst" });

// 뮤테이션 (쓰기)
const createActor = useMutation(api.actors.create);

// 액션 (외부 서비스 호출)
const generateProfile = useAction(api.openai.generateActorProfile);
```

### 스키마 정의

`convex/schema.ts`에서 테이블과 인덱스 정의:
- actors, columns, briefings, subscribers
- adminOtp, adminSessions (인증용)

---

## 칼럼 상태 플로우

```text
DRAFT → PENDING_REVIEW → APPROVED → PUBLISHED
                      ↘ REVISION ↗
                        REJECTED
```

| 상태           | 설명                      |
| -------------- | ------------------------- |
| DRAFT          | AI 생성 초안              |
| PENDING_REVIEW | 관리자 검토 대기          |
| REVISION       | 수정 요청 (피드백 포함)   |
| APPROVED       | 승인됨 (발행 대기)        |
| PUBLISHED      | 발행 완료                 |
| REJECTED       | 거절됨                    |

---

## 환경 변수

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=prod:your-deploy-key

# OpenAI
OPENAI_API_KEY=sk-...

# Resend (Email)
RESEND_API_KEY=re_...
EMAIL_FROM=briefing@daehanfinance.com

# Telegram
TELEGRAM_BOT_TOKEN=your-telegram-bot-token

# URLs
NEXT_PUBLIC_BASE_URL=https://daehanfinance.com
NEXT_PUBLIC_ROOT_URL=https://daehanfinance.com
```

---

## 커밋 컨벤션

```bash
# 태그 사용 시 (소문자)
feat: add column generation feature
fix: resolve otp validation error

# 태그 없을 시 (첫 글자 대문자)
Update briefing workflow
```

**Co-Author 추가 금지**: 커밋에 Claude 관련 문구 삽입하지 않음.

---

## 주의사항

1. **Convex 타입**: `Id<"actors">` 등 Convex ID 타입 사용
2. **클라이언트/서버 분리**: `"use client"` 컴포넌트에서만 Convex 훅 사용
3. **외부 API 호출**: actions (not mutations) 사용 (예: `api.openai.generateColumn`)
4. **개발 환경 OTP**: `68686868` 코드 사용 가능
