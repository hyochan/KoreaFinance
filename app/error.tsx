"use client";

import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ClockClockwise } from "@phosphor-icons/react/dist/ssr";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className={clsx([
        "h-screen p-16 bg-[#F8F9FA] bg-cover bg-center bg-no-repeat pb-24",
        "flex flex-col items-center justify-center gap-12",
      ])}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-6xl font-bold text-[#1E3A5F]">500</div>
        <p className="text-lg text-[#6B7280]">문제가 발생했습니다</p>
      </div>

      <button
        onClick={() => reset()}
        className="bg-[#1E3A5F] text-white px-6 py-3 rounded-md hover:bg-[#153E75] transition-colors shadow-md"
      >
        <ClockClockwise size={24} />
      </button>
    </main>
  );
}
