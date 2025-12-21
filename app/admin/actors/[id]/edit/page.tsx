import { Metadata } from "next";
import EditActorClient from "./Client";

export const metadata: Metadata = {
  title: "배우 수정 - 대한금융 관리자",
  description: "AI 배우 정보를 수정합니다",
};

export default function EditActorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <EditActorClient params={params} />;
}
