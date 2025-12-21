import Link from "next/link";
import { EnvelopeSimple, TelegramLogo } from "@phosphor-icons/react/dist/ssr";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <EnvelopeSimple className="w-8 h-8 text-accent" weight="bold" />
          </div>
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <TelegramLogo className="w-8 h-8 text-accent" weight="bold" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          매일 아침, 금융 브리핑을 받아보세요
        </h2>
        <p className="text-lg text-white/80 mb-10">
          이메일 또는 텔레그램으로 오전 7시에 배달됩니다
        </p>

        {/* CTA Button */}
        <Link
          href="/subscribe"
          className="inline-flex items-center gap-2 bg-accent text-primary px-10 py-4 rounded-xl font-semibold text-lg hover:bg-accent-light transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          무료로 구독하기
        </Link>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>무료 구독</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>스팸 없음</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>언제든 해지 가능</span>
          </div>
        </div>
      </div>
    </section>
  );
}
