import {
  Robot,
  Globe,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: Robot,
    title: "AI 기반 분석",
    desc: "GPT-4가 복잡한 금융 뉴스를 쉽게 요약하고 핵심만 추려드립니다",
    color: "bg-blue-500",
  },
  {
    icon: Globe,
    title: "한국인 관점",
    desc: "환율, 금리, 부동산 등 한국인에게 실질적으로 영향을 미치는 내용 중심",
    color: "bg-green-500",
  },
  {
    icon: Clock,
    title: "매일 오전 7시",
    desc: "출근 전 5분이면 오늘 하루 금융 이슈를 모두 파악할 수 있습니다",
    color: "bg-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "신뢰할 수 있는 출처",
    desc: "한국은행, 금융위, 주요 언론사 등 공신력 있는 소스만 활용합니다",
    color: "bg-orange-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            왜 대한금융인가요?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-7 h-7 text-white" weight="bold" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
