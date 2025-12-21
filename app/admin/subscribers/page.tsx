import { EnvelopeSimple, TelegramLogo, DotsThree } from "@phosphor-icons/react/dist/ssr";
import { Card, Badge } from "@/components/common";

// 샘플 데이터
const subscribers = [
  {
    id: 1,
    email: "kim@example.com",
    name: "김철수",
    locale: "ko",
    isActive: true,
    subscribedAt: "2024-12-01",
    preferences: { emailEnabled: true, telegramEnabled: true },
  },
  {
    id: 2,
    email: "lee@example.com",
    name: "이영희",
    locale: "ko",
    isActive: true,
    subscribedAt: "2024-12-05",
    preferences: { emailEnabled: true, telegramEnabled: false },
  },
  {
    id: 3,
    email: "park@example.com",
    name: "박민수",
    locale: "ko",
    isActive: false,
    subscribedAt: "2024-11-20",
    preferences: { emailEnabled: true, telegramEnabled: false },
  },
  {
    id: 4,
    email: "choi@example.com",
    name: "최지영",
    locale: "ko",
    isActive: true,
    subscribedAt: "2024-12-10",
    preferences: { emailEnabled: true, telegramEnabled: true },
  },
];

const stats = {
  total: 1250,
  active: 1180,
  emailOnly: 860,
  telegram: 320,
};

export default function AdminSubscribersPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">구독자 관리</h1>
        <p className="text-gray-500 mt-1">뉴스레터 구독자를 관리합니다</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-2xl font-bold text-primary">
            {stats.total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">전체 구독자</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-green-600">
            {stats.active.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">활성 구독자</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-blue-600">
            {stats.emailOnly.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">이메일만</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-purple-600">
            {stats.telegram.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">텔레그램</div>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  이메일
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  이름
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  채널
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  구독일
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {sub.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {sub.preferences.emailEnabled && (
                        <EnvelopeSimple
                          className="w-5 h-5 text-blue-500"
                          weight="fill"
                        />
                      )}
                      {sub.preferences.telegramEnabled && (
                        <TelegramLogo
                          className="w-5 h-5 text-blue-400"
                          weight="fill"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {sub.isActive ? (
                      <Badge variant="success">활성</Badge>
                    ) : (
                      <Badge variant="default">비활성</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {sub.subscribedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <DotsThree className="w-5 h-5" weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
