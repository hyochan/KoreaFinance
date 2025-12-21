"use client";

export default function ColumnsClient() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">칼럼 관리</h1>
          <p className="text-gray-500 mt-1">
            애널리스트별 칼럼을 생성하고 관리합니다
          </p>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">준비 중</h3>
        <p className="text-gray-500">칼럼 관리 기능을 준비하고 있습니다.</p>
      </div>
    </div>
  );
}
