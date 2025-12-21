import Link from "next/link";
import { ArrowRight, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <ChartLineUp className="w-5 h-5 text-accent" weight="bold" />
          <span className="text-white/90 text-sm font-medium">
            대한금융 · AI 기반 일일 금융 브리핑
          </span>
        </div>

        {/* Main Title - SEO Optimized */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          오늘의 금융,
          <br />
          5분이면 충분합니다
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          매일 아침, AI가 한국인 관점에서 꼭 알아야 할 금융 이슈 3-5개를
          정리해드립니다
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/briefings"
            className="group inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-light transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            오늘의 브리핑 보기
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              weight="bold"
            />
          </Link>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            무료 구독
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-accent">5</div>
            <div className="text-white/60 text-sm mt-1">분이면 충분</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">3-5</div>
            <div className="text-white/60 text-sm mt-1">핵심 이슈</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">07:00</div>
            <div className="text-white/60 text-sm mt-1">매일 업데이트</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
