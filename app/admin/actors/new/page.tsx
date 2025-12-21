import { Metadata } from "next";
import NewActorClient from "./Client";

export const metadata: Metadata = {
  title: "새 배우 생성 - 대한금융 관리자",
  description: "AI 배우를 생성합니다",
};

export default function NewActorPage() {
  return <NewActorClient />;
}
