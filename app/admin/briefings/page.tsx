import Link from "next/link";
import { PlusIcon, EyeIcon, PencilIcon, CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, Badge, Button } from "@/components/common";

// 샘플 데이터
const briefings = [
  {
    id: 1,
    date: "2024-12-22",
    title: "오늘의 브리핑 (자동 생성)",
    status: "PENDING_REVIEW",
    issueCount: 4,
  },
  {
    id: 2,
    date: "2024-12-21",
    title: "기준금리 동결, 환율 1,380원대 진입",
    status: "PUBLISHED",
    issueCount: 3,
  },
  {
    id: 3,
    date: "2024-12-20",
    title: "코스피 2,600 회복, 외국인 순매수",
    status: "PUBLISHED",
    issueCount: 3,
  },
  {
    id: 4,
    date: "2024-12-19",
    title: "미 CPI 둔화, 금리 인하 기대감 상승",
    status: "PUBLISHED",
    issueCount: 4,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return <Badge variant="success">발행됨</Badge>;
    case "PENDING_REVIEW":
      return <Badge variant="warning">검토 대기</Badge>;
    case "APPROVED":
      return <Badge variant="info">승인됨</Badge>;
    case "DRAFT":
      return <Badge variant="default">초안</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function AdminBriefingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">브리핑 관리</h1>
          <p className="text-gray-500 mt-1">일일 브리핑을 관리하고 발행합니다</p>
        </div>
        <Link href="/admin/briefings/create">
          <Button variant="primary">
            <PlusIcon className="w-5 h-5 mr-2" />
            새 브리핑
          </Button>
        </Link>
      </div>

      {/* Briefings Table */}
      <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  날짜
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  제목
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  이슈
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  상태
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {briefings.map((briefing) => (
                <tr key={briefing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {briefing.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {briefing.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {briefing.issueCount}개
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(briefing.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/briefings/${briefing.id}`}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="보기"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/briefings/${briefing.id}/edit`}
                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                        title="편집"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      {briefing.status === "PENDING_REVIEW" && (
                        <>
                          <button
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="승인"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="거부"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </>
                      )}
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
