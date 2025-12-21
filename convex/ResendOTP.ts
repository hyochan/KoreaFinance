import { Email } from "@convex-dev/auth/providers/Email";
import type { GenericActionCtxWithAuthConfig } from "@convex-dev/auth/server";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { sha256 as rawSha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { internal } from "./_generated/api";

const RESEND_API_KEY = process.env.AUTH_RESEND_KEY;
const isProduction = process.env.ENVIRONMENT === "production";
const FIXED_OTP_CODE = "68686868";
const FROM_EMAIL = isProduction ? "noreply@대한금융.com" : "onboarding@resend.dev";

// Fixed OTP emails for dev and prod
const FIXED_OTP_EMAILS = ["hyo+test1@gmail.com"].map((email) =>
  email.toLowerCase(),
);

const textEncoder = new TextEncoder();

const hashToken = (token: string) =>
  encodeHexLowerCase(rawSha256(textEncoder.encode(token)));

async function tryApplyFixedOtp(
  ctx: GenericActionCtxWithAuthConfig<any> | undefined,
  email: string,
  originalToken: string,
  providerId: string,
): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  const isEmailAllowed = FIXED_OTP_EMAILS.includes(normalizedEmail);

  // In dev mode, allow all emails to use fixed OTP
  // In production, only allow specific test emails
  if (!ctx || (isProduction && !isEmailAllowed)) {
    return false;
  }

  const success = await ctx.runMutation(
    internal.internals.overrideVerificationCode,
    {
      email: email.trim(),
      provider: providerId,
      originalHash: hashToken(originalToken),
      fixedHash: hashToken(FIXED_OTP_CODE),
    },
  );

  if (!success) {
    console.warn(
      "[auth] Fixed OTP requested but no verification code entry was found.",
    );
    return false;
  }

  if (!isProduction) {
    console.info("[auth] Using fixed OTP", {
      email: email.trim(),
      code: FIXED_OTP_CODE,
    });
  }
  return true;
}

const emailTemplate = {
  subject: "대한금융 이메일 인증 안내",
  text: (token: string) =>
    `안녕하세요, 대한금융입니다.\n\n인증 코드: ${token}\n\n위 코드를 입력하여 로그인 절차를 완료해 주세요.`,
  html: (token: string) => `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>대한금융 - 이메일 인증</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif; background-color: #F5F5F5;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F5F5F5; padding: 40px 0;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <tr>
                <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 48px 48px 40px 48px; text-align: center;">
                  <h2 style="margin: 0 0 8px 0; font-size: 36px; font-weight: 700; color: #ffffff;">대한금융</h2>
                  <p style="margin: 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">AI 금융 브리핑 플랫폼</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 48px 48px 24px 48px; text-align: center;">
                  <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">이메일 인증</h1>
                  <p style="margin: 0; font-size: 16px; color: #666666; line-height: 1.6;">계속하려면 이메일을 인증해 주세요</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 48px 48px 48px;">
                  <div style="background: #F8F9FA; border-radius: 12px; padding: 32px; text-align: center; border: 1px solid #E9ECEF;">
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #495057; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">인증 코드</p>
                    <div style="background-color: #ffffff; border: 2px solid #1a1a2e; border-radius: 10px; padding: 20px 32px; display: inline-block;">
                      <span style="font-size: 36px; font-weight: 700; color: #1a1a2e; letter-spacing: 6px; font-family: 'Courier New', monospace;">${token}</span>
                    </div>
                    <p style="margin: 20px 0 0 0; font-size: 14px; color: #6c757d; line-height: 1.6;">위 코드를 입력하여 로그인을 완료하세요</p>
                  </div>
                  <div style="margin-top: 32px; padding: 20px 24px; background-color: #FFF3CD; border-radius: 10px; border-left: 4px solid #FFC107;">
                    <p style="margin: 0; font-size: 14px; color: #856404; line-height: 1.6;">
                      <strong>🔒 보안 안내:</strong> 이 코드는 15분 후에 만료됩니다. 절대 다른 사람과 공유하지 마세요.
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 48px; background-color: #F8F9FA; border-top: 1px solid #E9ECEF;">
                  <p style="margin: 0; font-size: 12px; color: #868e96; text-align: center; line-height: 1.8;">
                    이 이메일을 요청하지 않으셨다면 무시해 주세요.<br>
                    © 2025 대한금융. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
};

export const ResendOtp = Email({
  id: "resend-otp",
  apiKey: RESEND_API_KEY,
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    // In dev mode, always use fixed OTP for easy testing
    if (!isProduction) {
      return FIXED_OTP_CODE;
    }
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest(
    {
      identifier: email,
      provider,
      token,
    }: {
      identifier: string;
      provider: { apiKey?: string; id: string };
      token: string;
    },
    ctx?: GenericActionCtxWithAuthConfig<any>,
  ) {
    // In production, try to apply fixed OTP for specific test accounts
    if (
      isProduction &&
      (await tryApplyFixedOtp(ctx, email, token, provider.id))
    ) {
      return;
    }

    // In development, skip email sending and just log the OTP code
    if (!isProduction) {
      console.info("");
      console.info("═══════════════════════════════════════════════");
      console.info("🔐 [DEV MODE] OTP Code - DO NOT SEND EMAIL");
      console.info("═══════════════════════════════════════════════");
      console.info("  Email:", email);
      console.info("  OTP Code:", FIXED_OTP_CODE);
      console.info("  Expires: 15 minutes");
      console.info("═══════════════════════════════════════════════");
      console.info("");
      return;
    }

    // Production: Send actual email
    const resend = new ResendAPI(provider.apiKey ?? RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `대한금융 <${FROM_EMAIL}>`,
      to: [email],
      subject: emailTemplate.subject,
      text: emailTemplate.text(token),
      html: emailTemplate.html(token),
    });

    if (error) {
      console.error("Failed to send OTP email:", error);
      throw new Error(JSON.stringify(error));
    }
  },
});
