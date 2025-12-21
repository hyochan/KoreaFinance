import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";

export const metadata: Metadata = {
  title: "금융 브리핑 무료 구독 - 매일 아침 금리, 환율 정보 받기",
  description:
    "매일 아침 7시, 이메일 또는 텔레그램으로 금융 브리핑을 무료로 받아보세요. 금리, 환율, 주식 등 한국인에게 중요한 정보를 5분 만에 파악할 수 있습니다.",
  openGraph: {
    title: "금융 브리핑 무료 구독 - 매일 아침 금리, 환율 정보 받기",
    description:
      "매일 아침 7시, 이메일 또는 텔레그램으로 금융 브리핑을 무료로 받아보세요.",
    type: "website",
  },
};

export default function SubscribePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              무료 구독
            </h1>
            <p className="text-gray-600 text-lg">
              매일 아침 7시, 금융 브리핑을 받아보세요
            </p>
          </div>

          {/* Subscribe Form */}
          <SubscribeForm />

          {/* Benefits */}
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
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
              </div>
              <div>
                <div className="font-medium text-gray-900">완전 무료</div>
                <div className="text-sm text-gray-500">
                  숨겨진 비용 없이 무료로 이용할 수 있습니다
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
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
              </div>
              <div>
                <div className="font-medium text-gray-900">매일 오전 7시 발송</div>
                <div className="text-sm text-gray-500">
                  출근길에 5분이면 오늘의 금융 트렌드를 파악할 수 있습니다
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
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
              </div>
              <div>
                <div className="font-medium text-gray-900">언제든 해지 가능</div>
                <div className="text-sm text-gray-500">
                  원클릭으로 언제든 구독을 해지할 수 있습니다
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
