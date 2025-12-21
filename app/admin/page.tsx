import {
  Newspaper,
  Users,
  ChartLineUp,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/common";

// 샘플 통계 데이터 (실제로는 DB에서 가져옴)
const stats = {
  totalBriefings: 45,
  publishedThisMonth: 21,
  totalSubscribers: 1250,
  activeSubscribers: 1180,
  emailsSentToday: 1180,
  telegramSentToday: 320,
};

const recentBriefings = [
  {
    id: 1,
    date: "2024-12-21",
    title: "기준금리 동결, 환율 1,380원대 진입",
    status: "PUBLISHED",
  },
  {
    id: 2,
    date: "2024-12-20",
    title: "코스피 2,600 회복, 외국인 순매수",
    status: "PUBLISHED",
  },
  {
    id: 3,
    date: "2024-12-22",
    title: "오늘의 브리핑",
    status: "PENDING_REVIEW",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">대시보드</h1>
        <p className="text-gray-500 mt-1">대한금융 브리핑 관리 현황</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-primary" weight="bold" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {stats.totalBriefings}
              </div>
              <div className="text-sm text-gray-500">전체 브리핑</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ChartLineUp className="w-6 h-6 text-green-600" weight="bold" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {stats.publishedThisMonth}
              </div>
              <div className="text-sm text-gray-500">이번 달 발행</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" weight="bold" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {stats.activeSubscribers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">활성 구독자</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <EnvelopeSimple className="w-6 h-6 text-purple-600" weight="bold" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {stats.emailsSentToday.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">오늘 발송된 이메일</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Briefings */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-lg font-semibold text-primary mb-4">최근 브리핑</h2>
        <div className="space-y-4">
          {recentBriefings.map((briefing) => (
            <div
              key={briefing.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <div className="font-medium text-gray-900">{briefing.title}</div>
                <div className="text-sm text-gray-500">{briefing.date}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  briefing.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : briefing.status === "PENDING_REVIEW"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {briefing.status === "PUBLISHED"
                  ? "발행됨"
                  : briefing.status === "PENDING_REVIEW"
                  ? "검토 대기"
                  : briefing.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
