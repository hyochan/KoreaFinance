import { Metadata } from "next";
import ActorDetailClient from "./Client";

export const metadata: Metadata = {
  title: "배우 상세 - 대한금융 관리자",
  description: "AI 배우 상세 정보를 확인합니다",
};

export default function ActorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ActorDetailClient params={params} />;
}
