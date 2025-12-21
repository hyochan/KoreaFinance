import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// 사용자 프로필 생성/확인
export const ensureUserProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if userProfile already exists
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      return existingProfile._id;
    }

    // Get user info from auth table
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Create userProfile
    const profileId = await ctx.db.insert("userProfiles", {
      userId,
      displayName: user.name || user.email?.split("@")[0] || "User",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return profileId;
  },
});

// 프로필 이름 업데이트
export const updateDisplayName = mutation({
  args: {
    displayName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Find existing user profile
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        displayName: args.displayName,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        displayName: args.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// 아바타 URL 업데이트
export const updateAvatarUrl = mutation({
  args: {
    avatarUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    const now = Date.now();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        avatarUrl: args.avatarUrl,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        avatarUrl: args.avatarUrl,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

// Bio 업데이트
export const updateBio = mutation({
  args: {
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        bio: args.bio,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        bio: args.bio,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// 로케일 업데이트
export const updateLocale = mutation({
  args: {
    locale: v.union(v.literal("ko"), v.literal("en")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        locale: args.locale,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        locale: args.locale,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// 테마 업데이트
export const updateTheme = mutation({
  args: {
    theme: v.union(v.literal("light"), v.literal("dark")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        theme: args.theme,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        theme: args.theme,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// 프로필 업데이트 (displayName + bio)
export const updateProfile = mutation({
  args: {
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    const now = Date.now();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        ...(args.displayName !== undefined && { displayName: args.displayName }),
        ...(args.bio !== undefined && { bio: args.bio }),
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        displayName: args.displayName,
        bio: args.bio,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});
