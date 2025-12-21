"use client";

import { useState } from "react";
import { Gear, Key, Bell, Database, Check } from "@phosphor-icons/react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 mt-1">시스템 설정을 관리합니다</p>
      </div>

      {/* Environment Variables Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">환경 변수 상태</h2>
        </div>
        <div className="space-y-3">
          <EnvStatus name="DATABASE_URL" />
          <EnvStatus name="OPENAI_API_KEY" />
          <EnvStatus name="RESEND_API_KEY" />
          <EnvStatus name="TELEGRAM_BOT_TOKEN" />
          <EnvStatus name="CRON_SECRET" />
          <EnvStatus name="NEXT_PUBLIC_BASE_URL" />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">알림 설정</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">이메일 알림</p>
              <p className="text-sm text-gray-500">
                브리핑 발행 시 구독자에게 이메일 발송
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">텔레그램 알림</p>
              <p className="text-sm text-gray-500">
                브리핑 발행 시 텔레그램으로 발송
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">데이터베이스</h2>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Provider:</span> PostgreSQL (Vercel Postgres)
          </p>
          <p className="text-gray-600">
            <span className="font-medium">ORM:</span> Prisma 5.22.0
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            마이그레이션은 Vercel 배포 시 자동으로 실행됩니다.
          </p>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Gear className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">시스템 정보</h2>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Framework:</span> Next.js 16
          </p>
          <p className="text-gray-600">
            <span className="font-medium">AI Model:</span> GPT-4 Turbo
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Cron Schedule:</span> 매일 오전 7시 (KST)
          </p>
        </div>
      </div>

      {/* Save Button (placeholder) */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              저장됨
            </>
          ) : (
            "설정 저장"
          )}
        </button>
      </div>
    </div>
  );
}

function EnvStatus({ name }: { name: string }) {
  // 클라이언트에서는 환경 변수 상태를 정확히 알 수 없으므로 placeholder 표시
  const isPublic = name.startsWith("NEXT_PUBLIC_");

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
      <code className="text-sm font-mono text-gray-700">{name}</code>
      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
        {isPublic ? "공개" : "비공개"}
      </span>
    </div>
  );
}
