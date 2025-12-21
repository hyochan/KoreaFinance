import { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import {
  CalendarBlank,
  ArrowLeft,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import { Navbar, Footer } from "@/components/layout";
import { IssueItem } from "@/components/briefing";

// SEO: 네이버 최적화 - 날짜별 키워드 중심 title
export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;

  return {
    title: `${date} 금융 브리핑 - 금리, 환율, 주식 핵심 정리`,
    openGraph: {
      title: `${date} 금융 브리핑 - 금리, 환율, 주식 핵심 정리`,
      type: "article",
    },
  };
}

// 샘플 데이터 (실제로는 DB에서 가져옴)
const sampleIssues = [
  {
    id: 1,
    order: 1,
    category: "interest_rate",
    fact: "한국은행 기준금리 3.50% 동결, 6회 연속 유지",
    context:
      "한국은행 금융통화위원회는 이날 회의에서 기준금리를 현행 연 3.50%로 유지하기로 결정했습니다. 이는 지난해 1월 이후 6회 연속 동결로, 고금리 기조가 당분간 이어질 것으로 보입니다. 이창용 한은 총재는 \"물가 상승 압력이 여전히 남아있어 금리 인하를 서두르지 않겠다\"고 밝혔습니다.",
    impact:
      "변동금리 대출자는 당분간 현재 이자 부담이 유지됩니다. 예금 금리도 큰 변동 없이 현 수준을 유지할 전망입니다. 내년 상반기 금리 인하 가능성이 있으나, 미국 연준 정책에 따라 변동될 수 있습니다.",
    keyNumbers: [
      { label: "기준금리", value: "3.50%", change: "동결", isPositive: true },
      { label: "동결 횟수", value: "6회", change: "연속", isPositive: true },
    ],
    sources: [
      { title: "한국은행 보도자료", url: "https://www.bok.or.kr", publisher: "한국은행" },
      { title: "연합뉴스", url: "https://www.yna.co.kr", publisher: "연합뉴스" },
    ],
  },
  {
    id: 2,
    order: 2,
    category: "exchange_rate",
    fact: "원/달러 환율 1,380원대 진입, 2개월 만에 최고치",
    context:
      "원/달러 환율이 1,380원대에 진입하며 2개월 만에 최고치를 기록했습니다. 미국 국채 금리 상승과 달러 강세가 주요 원인입니다. 중국 경기 둔화 우려도 원화 약세에 영향을 미치고 있습니다.",
    impact:
      "해외 직구, 해외여행 경비가 증가합니다. 수입 물가 상승으로 생활비 부담이 늘어날 수 있습니다. 반면 수출 기업에는 환율 상승이 호재로 작용합니다.",
    keyNumbers: [
      { label: "원/달러", value: "1,382원", change: "+1.2%", isPositive: false },
      { label: "월간 변동", value: "+28원", change: "상승", isPositive: false },
    ],
    sources: [
      { title: "서울외국환중개", url: "https://www.smbs.biz", publisher: "서울외환" },
    ],
  },
  {
    id: 3,
    order: 3,
    category: "stock",
    fact: "코스피 2,600선 회복, 외국인 3거래일 연속 순매수",
    context:
      "코스피 지수가 2,600선을 회복하며 외국인이 3거래일 연속 순매수를 이어갔습니다. 반도체 업종을 중심으로 한 외국인 매수세가 지수 상승을 이끌었습니다. 삼성전자와 SK하이닉스가 각각 2%, 3% 상승했습니다.",
    impact:
      "연말 랠리 기대감이 높아지고 있습니다. 반도체 업종 강세가 지속될 경우 코스피 추가 상승 가능성이 있습니다. 다만 미국 증시 변동성에 따른 조정 가능성도 염두에 두어야 합니다.",
    keyNumbers: [
      { label: "코스피", value: "2,612", change: "+1.8%", isPositive: true },
      { label: "외국인 순매수", value: "3,200억", change: "3일 연속", isPositive: true },
    ],
    sources: [
      { title: "한국거래소", url: "https://www.krx.co.kr", publisher: "KRX" },
    ],
  },
];

export default async function BriefingDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  let formattedDate: string;
  try {
    formattedDate = format(parseISO(date), "PPP EEEE", { locale: ko });
  } catch {
    formattedDate = date;
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link
            href="/briefings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>

          {/* Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <CalendarBlank className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>

            {/* SEO: h1은 키워드 중심, 브랜드는 아래에 표시 */}
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              기준금리 동결, 환율 상승, 코스피 2,600 회복
            </h1>
            <p className="text-gray-500 text-sm">
              대한금융 · AI 기반 일일 금융 브리핑
            </p>

            {/* Share Button */}
            <div className="mt-6 flex items-center gap-4">
              <button className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                <ShareNetwork className="w-5 h-5" />
                공유하기
              </button>
            </div>
          </div>

          {/* Issues */}
          <div>
            {sampleIssues.map((issue) => (
              <IssueItem key={issue.id} issue={issue} />
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <Link
              href="/briefings"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              &larr; 이전 브리핑
            </Link>
            <Link
              href="/briefings"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              다음 브리핑 &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
