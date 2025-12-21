import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/common";

const categoryLabels: Record<string, string> = {
  korean_stock: "한국주식",
  us_stock: "미국주식",
  bitcoin: "비트코인",
  interest_rate: "금리",
  exchange_rate: "환율",
  issue: "이슈",
};

interface BriefingCardProps {
  briefing: {
    id: number;
    date: Date;
    title?: string | null;
    summary?: string | null;
    status: string;
    issues?: Array<{
      category: string | null;
    }>;
  };
}

export function BriefingCard({ briefing }: BriefingCardProps) {
  const formattedDate = format(new Date(briefing.date), "PPP", {
    locale: ko,
  });
  const dateSlug = format(new Date(briefing.date), "yyyy-MM-dd");

  const categories = briefing.issues
    ?.map((issue) => issue.category)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link
      href={`/briefings/${dateSlug}`}
      className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-gray-100"
    >
      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <CalendarBlank className="w-4 h-4" />
        <span>{formattedDate}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
        {briefing.title || "오늘의 금융 브리핑"}
      </h3>

      {/* Summary */}
      {briefing.summary && (
        <p className="text-gray-600 mb-4 line-clamp-2">{briefing.summary}</p>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <Badge key={index} variant="primary" size="sm">
              {categoryLabels[category as string] || category}
            </Badge>
          ))}
        </div>
      )}

      {/* Read More */}
      <div className="flex items-center gap-1 text-primary font-medium text-sm">
        <span>자세히 보기</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
