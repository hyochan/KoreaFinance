import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  FeaturesSection,
  TodayBriefingSection,
  CTASection,
} from "@/components/home";

// SEO: 네이버 최적화 - 키워드 중심 title
export const metadata: Metadata = {
  title: "오늘의 금융 브리핑 - 금리, 환율, 주식 핵심 이슈 정리",
  description:
    "매일 아침, AI가 한국인 관점에서 꼭 알아야 할 금융 이슈 3-5개를 정리해드립니다. 금리, 환율, 주식, 부동산 등 핵심 정보를 5분 만에 파악하세요.",
  keywords: "금융 브리핑, 금리, 환율, 주식, 부동산, 경제 뉴스, 한국 금융",
  openGraph: {
    title: "오늘의 금융 브리핑 - 금리, 환율, 주식 핵심 이슈 정리",
    description:
      "매일 아침, AI가 한국인 관점에서 꼭 알아야 할 금융 이슈 3-5개를 정리해드립니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TodayBriefingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
