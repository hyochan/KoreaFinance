import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/common";

// 임시 샘플 데이터 (실제로는 API에서 가져옴)
const sampleIssues = [
  {
    id: 1,
    category: "interest_rate",
    fact: "한국은행 기준금리 3.50% 동결, 6회 연속 유지",
    impact: "변동금리 대출자 이자 부담 유지, 예금 금리도 당분간 현 수준",
  },
  {
    id: 2,
    category: "exchange_rate",
    fact: "원/달러 환율 1,380원대 진입, 2개월 만에 최고치",
    impact: "해외 직구, 여행 경비 증가 예상. 수출 기업에는 호재",
  },
  {
    id: 3,
    category: "stock",
    fact: "코스피 2,600선 회복, 외국인 3거래일 연속 순매수",
    impact: "연말 랠리 기대감 상승, 반도체 업종 강세 지속",
  },
];

const categoryLabels: Record<string, string> = {
  interest_rate: "금리",
  exchange_rate: "환율",
  stock: "주식",
  real_estate: "부동산",
  economy: "경제",
  policy: "정책",
};

const categoryVariants: Record<string, "primary" | "success" | "warning" | "info" | "danger"> = {
  interest_rate: "primary",
  exchange_rate: "success",
  stock: "warning",
  real_estate: "info",
  economy: "primary",
  policy: "danger",
};

export function TodayBriefingSection() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <CalendarBlank className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              오늘의 브리핑
            </h2>
          </div>
          <Link
            href="/briefings"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
          >
            전체 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Briefing Cards */}
        <div className="space-y-6">
          {sampleIssues.map((issue, index) => (
            <div
              key={issue.id}
              className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={categoryVariants[issue.category] || "primary"}>
                      {categoryLabels[issue.category] || issue.category}
                    </Badge>
                  </div>

                  {/* Fact */}
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3">
                    {issue.fact}
                  </h3>

                  {/* Impact */}
                  <p className="text-gray-600">
                    <span className="font-medium text-primary-light">영향:</span>{" "}
                    {issue.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Briefing CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/briefings"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-light transition-colors"
          >
            오늘의 브리핑 보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
