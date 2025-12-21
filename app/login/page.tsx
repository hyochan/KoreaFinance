import { Metadata } from "next";
import LoginClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "로그인 - 대한금융",
  description: "대한금융 로그인",
};

export default function LoginPage() {
  return <LoginClient />;
}
