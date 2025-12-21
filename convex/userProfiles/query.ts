import { query, internalQuery } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// 관리자 userId 목록 조회 (내부용)
export const getAdminUserIds = internalQuery({
  args: {},
  handler: async (ctx) => {
    const adminProfiles = await ctx.db
      .query("userProfiles")
      .withIndex("by_admin", (q) => q.eq("isAdmin", true))
      .collect();

    return adminProfiles.map((p) => p.userId);
  },
});

// 현재 사용자 프로필 조회
export const getCurrentUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // Get user info first
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    // Return user info even if no profile exists yet
    const email = user.email as string | undefined;
    const defaultDisplayName = email?.split("@")[0] || "사용자";

    // Resolve avatar URL from storage
    let avatarUrl: string | null = null;
    if (profile?.avatarUrl) {
      try {
        avatarUrl = await ctx.storage.getUrl(profile.avatarUrl as any);
      } catch {
        // Invalid storage ID, ignore
      }
    }

    return {
      _id: profile?._id,
      userId,
      displayName: profile?.displayName || defaultDisplayName,
      avatarUrl,
      bio: profile?.bio,
      locale: profile?.locale,
      theme: profile?.theme,
      isAdmin: profile?.isAdmin,
      createdAt: profile?.createdAt,
      updatedAt: profile?.updatedAt,
      email,
    };
  },
});

// 현재 사용자가 관리자인지 확인
export const isCurrentUserAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    return profile?.isAdmin === true;
  },
});

// userId로 프로필 조회 (관리자용)
export const getUserProfileById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) return null;

    // 관리자 확인
    const adminProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", currentUserId))
      .first();

    if (!adminProfile?.isAdmin) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const user = await ctx.db.get(args.userId);

    return {
      ...profile,
      email: user?.email,
    };
  },
});
