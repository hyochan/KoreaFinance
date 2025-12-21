import { Metadata } from "next";
import LoginClient from "./Client";

export const metadata: Metadata = {
  title: "관리자 로그인 - 대한금융",
  description: "대한금융 관리자 로그인",
};

export default function AdminLoginPage() {
  return <LoginClient />;
}
