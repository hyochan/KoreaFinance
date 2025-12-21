import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Internal mutation to override verification code for app review/testing purposes.
 * This allows specific test accounts to use a fixed OTP code instead of the randomly generated one.
 */
export const overrideVerificationCode = internalMutation({
  args: {
    email: v.string(),
    provider: v.string(),
    originalHash: v.string(),
    fixedHash: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, provider, fixedHash } = args;

    // Try to find authAccount first (for existing users only)
    // New users will receive actual OTP via email
    const authAccount = await ctx.db
      .query("authAccounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", provider).eq("providerAccountId", email),
      )
      .first();

    if (!authAccount) {
      // New user - skip fixed OTP, they'll use the actual code from email
      return false;
    }

    // For existing users, find by accountId (uses index, should be fast)
    const codeEntry = await ctx.db
      .query("authVerificationCodes")
      .withIndex("accountId", (q) => q.eq("accountId", authAccount._id))
      .first();

    if (codeEntry) {
      await ctx.db.patch(codeEntry._id, { code: fixedHash });
      return true;
    }

    return false;
  },
});
