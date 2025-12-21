"use client";

import { useState } from "react";
import { EnvelopeIcon, KeyIcon, ArrowRightIcon, SpinnerGapIcon } from "@phosphor-icons/react/dist/ssr";

export default function LoginClient() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    // TODO: Add OTP send logic
    console.log("Send OTP to:", email);
    setStep("otp");
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("인증코드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    // TODO: Add OTP verify logic
    console.log("Verify OTP:", otp);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">대한금융</h1>
            <p className="text-gray-500 mt-2">관리자 로그인</p>
          </div>

          {/* Form */}
          {step === "email" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <SpinnerGapIcon className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    인증코드 받기
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{email}</span>
                  <br />
                  으로 발송된 인증코드를 입력해주세요.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  인증코드
                </label>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    placeholder="8자리 인증코드"
                    maxLength={8}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-center tracking-widest font-mono text-lg"
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <SpinnerGapIcon className="w-5 h-5 animate-spin" />
                ) : (
                  "로그인"
                )}
              </button>

              <button
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                }}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                다른 이메일로 시도
              </button>
            </div>
          )}

          {/* Dev hint */}
          <p className="text-xs text-gray-400 text-center mt-6">
            개발 환경: 68686868 코드 사용 가능
          </p>
        </div>
      </div>
    </div>
  );
}
