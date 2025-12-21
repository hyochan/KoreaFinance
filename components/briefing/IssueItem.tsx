import { ArrowSquareOut, TrendUp, TrendDown } from "@phosphor-icons/react/dist/ssr";
import { Badge, Card } from "@/components/common";

const categoryLabels: Record<string, string> = {
  korean_stock: "한국주식",
  us_stock: "미국주식",
  bitcoin: "비트코인",
  interest_rate: "금리",
  exchange_rate: "환율",
  issue: "이슈",
};

const categoryColors: Record<string, "primary" | "success" | "warning" | "info" | "danger"> = {
  korean_stock: "danger",
  us_stock: "primary",
  bitcoin: "warning",
  interest_rate: "success",
  exchange_rate: "info",
  issue: "primary",
};

interface KeyNumber {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

interface SourceLink {
  title: string;
  url: string;
  publisher?: string;
}

interface IssueItemProps {
  issue: {
    id: number;
    order: number;
    fact: string;
    context: string;
    impact: string;
    keyNumbers?: KeyNumber[] | null;
    sources?: SourceLink[] | null;
    category?: string | null;
  };
}

export function IssueItem({ issue }: IssueItemProps) {
  return (
    <Card variant="outlined" padding="lg" className="mb-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Order Number */}
        <div className="shrink-0 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
          {issue.order}
        </div>

        <div className="flex-1">
          {/* Category Badge */}
          {issue.category && (
            <Badge variant={categoryColors[issue.category] || "primary"} className="mb-2">
              {categoryLabels[issue.category] || issue.category}
            </Badge>
          )}

          {/* Fact (Title) */}
          <h3 className="text-xl font-semibold text-primary leading-tight">
            {issue.fact}
          </h3>
        </div>
      </div>

      {/* Context */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          배경
        </h4>
        <p className="text-gray-700 leading-relaxed">{issue.context}</p>
      </div>

      {/* Impact */}
      <div className="mb-6 bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
        <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
          영향
        </h4>
        <p className="text-gray-700 leading-relaxed">{issue.impact}</p>
      </div>

      {/* Key Numbers */}
      {issue.keyNumbers && issue.keyNumbers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            핵심 수치
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {issue.keyNumbers.map((num, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 text-center"
              >
                <div className="text-xs text-gray-500 mb-1">{num.label}</div>
                <div className="text-lg font-bold text-primary">{num.value}</div>
                {num.change && (
                  <div
                    className={`text-sm font-medium flex items-center justify-center gap-1 ${
                      num.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {num.isPositive ? (
                      <TrendUp className="w-4 h-4" />
                    ) : (
                      <TrendDown className="w-4 h-4" />
                    )}
                    {num.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {issue.sources && issue.sources.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            출처
          </h4>
          <div className="flex flex-wrap gap-2">
            {issue.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-light bg-primary/5 px-3 py-1.5 rounded-full transition-colors"
              >
                {source.publisher || source.title}
                <ArrowSquareOut className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
