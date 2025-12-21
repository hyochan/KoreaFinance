import Link from "next/link";
import clsx from "clsx";

export default function NotFound() {
  return (
    <main
      className={clsx([
        "h-screen p-16 bg-[#F8F9FA] bg-cover bg-center bg-no-repeat pb-24",
        "flex flex-col items-center justify-center gap-12",
      ])}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-6xl font-bold text-[#1E3A5F]">404</div>
        <p className="text-lg text-[#6B7280]">페이지를 찾을 수 없습니다</p>
      </div>

      <Link
        href="/"
        className="bg-[#1E3A5F] text-white px-6 py-3 rounded-md hover:bg-[#153E75] transition-colors shadow-md"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
