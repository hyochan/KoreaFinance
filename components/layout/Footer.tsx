import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 brightness-0 invert"
              />
              <span className="text-xl font-bold">대한금융</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              AI 기반 일일 금융 브리핑 서비스
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              본 서비스에서 제공하는 정보는 투자 조언이 아니며, 투자 결정에 대한
              책임은 사용자 본인에게 있습니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/briefings"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  브리핑
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  구독
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">법적 고지</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} 대한금융. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
