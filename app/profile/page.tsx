import { Metadata } from "next";
import ProfileClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "내 프로필 - 대한금융",
  description: "내 프로필 정보",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
