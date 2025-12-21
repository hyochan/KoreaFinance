import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { BriefingCard } from "@/components/briefing";

export const metadata: Metadata = {
  title: "금융 브리핑 아카이브 - 금리, 환율, 주식 일일 정리",
  description:
    "매일 업데이트되는 금융 브리핑 아카이브입니다. 금리, 환율, 주식, 부동산 등 한국인에게 중요한 금융 이슈를 날짜별로 확인하세요.",
  openGraph: {
    title: "금융 브리핑 아카이브 - 금리, 환율, 주식 일일 정리",
    description:
      "매일 업데이트되는 금융 브리핑 아카이브입니다. 금리, 환율, 주식, 부동산 등 한국인에게 중요한 금융 이슈를 날짜별로 확인하세요.",
    type: "website",
  },
};

// 샘플 데이터 (실제로는 DB에서 가져옴)
const sampleBriefings = [
  {
    id: 1,
    date: new Date(),
    title: "기준금리 동결, 환율 1,380원대 진입",
    summary: "한국은행 기준금리 6회 연속 동결, 원/달러 환율 2개월 만에 최고치 기록",
    status: "PUBLISHED",
    issues: [
      { category: "interest_rate" },
      { category: "exchange_rate" },
      { category: "stock" },
    ],
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000),
    title: "코스피 2,600 회복, 외국인 순매수 지속",
    summary: "코스피 2,600선 회복, 외국인 3거래일 연속 순매수",
    status: "PUBLISHED",
    issues: [{ category: "stock" }, { category: "economy" }],
  },
  {
    id: 3,
    date: new Date(Date.now() - 86400000 * 2),
    title: "미 CPI 둔화, 금리 인하 기대감 상승",
    summary: "미국 소비자물가 둔화로 연준 금리 인하 기대감 확대",
    status: "PUBLISHED",
    issues: [
      { category: "interest_rate" },
      { category: "economy" },
      { category: "policy" },
    ],
  },
];

export default function BriefingsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              금융 브리핑 아카이브
            </h1>
            <p className="text-gray-600 text-lg">
              매일 업데이트되는 금융 브리핑을 확인하세요
            </p>
          </div>

          {/* Briefing List */}
          <div className="space-y-6">
            {sampleBriefings.map((briefing) => (
              <BriefingCard key={briefing.id} briefing={briefing} />
            ))}
          </div>

          {/* Load More (placeholder) */}
          <div className="mt-12 text-center">
            <button className="text-primary font-medium hover:text-primary-light transition-colors">
              더 보기
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
