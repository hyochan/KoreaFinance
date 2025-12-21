"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function ActorDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/actors"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">배우 상세</h1>
          <p className="text-gray-500 mt-1">ID: {id}</p>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-5xl mb-4">🎭</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">준비 중</h3>
        <p className="text-gray-500">배우 상세 기능을 준비하고 있습니다.</p>
      </div>
    </div>
  );
}
