"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, UserCircleIcon, SpinnerGapIcon, FloppyDiskIcon, CameraIcon } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/layout/Navbar";
import { useQuery, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProfileClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const profile = useQuery(api.userProfiles.query.getCurrentUserProfile);
  const updateProfile = useMutation(api.userProfiles.mutation.updateProfile);
  const updateAvatarUrl = useMutation(api.userProfiles.mutation.updateAvatarUrl);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Load profile data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
    }
  }, [profile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setUploadingImage(true);
    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      // Update avatar URL in profile
      await updateAvatarUrl({ avatarUrl: storageId });
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ displayName: displayName.trim() });
      alert("저장되었습니다.");
    } catch (e) {
      console.error("Failed to save profile:", e);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // Show loading while checking auth
  if (authLoading || (isAuthenticated && profile === undefined)) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
          <SpinnerGapIcon className="w-8 h-8 text-primary animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>돌아가기</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">내 프로필</h1>
            <p className="text-gray-500 mt-1">프로필 정보를 수정합니다</p>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={handleImageClick}
                  disabled={uploadingImage}
                  className="relative w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center group"
                >
                  {profile?.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt="프로필 이미지"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-12 h-12 text-primary" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingImage ? (
                      <SpinnerGapIcon className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <CameraIcon className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              </div>
              <div>
                <p className="font-medium text-gray-900">{profile?.displayName}</p>
                <button
                  onClick={handleImageClick}
                  disabled={uploadingImage}
                  className="text-sm text-primary hover:underline"
                >
                  {uploadingImage ? "업로드 중..." : "이미지 변경"}
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-gray-400 mt-1">커뮤니티에서 표시될 닉네임입니다</p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <SpinnerGapIcon className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <FloppyDiskIcon className="w-5 h-5" />
                    저장
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
