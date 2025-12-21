import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

// 대한금융 Convex Schema

const applicationTables = {
  // 사용자 프로필
  userProfiles: defineTable({
    userId: v.id("users"),
    displayName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    locale: v.optional(v.union(v.literal("ko"), v.literal("en"))),
    theme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
    isAdmin: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_admin", ["isAdmin"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
