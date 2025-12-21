"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AdminSidebar } from "./AdminSidebar";
import { SpinnerGapIcon } from "@phosphor-icons/react/dist/ssr";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const profile = useQuery(
    api.userProfiles.query.getCurrentUserProfile,
    isAuthenticated ? {} : "skip"
  );

  // Redirect non-admin users to home
  useEffect(() => {
    if (isLoginPage) return;

    if (!authLoading && !isAuthenticated) {
      router.replace("/");
      return;
    }

    if (profile !== undefined && !profile?.isAdmin) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, profile, router, isLoginPage]);

  // 로그인 페이지는 사이드바 없이 렌더링
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (authLoading || (isAuthenticated && profile === undefined)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SpinnerGapIcon className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Not authenticated or not admin - show nothing while redirecting
  if (!isAuthenticated || !profile?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SpinnerGapIcon className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // 사이드바와 함께 렌더링
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
