import { Metadata } from "next";
import BriefingDetailClient from "./Client";

export const metadata: Metadata = {
  title: "브리핑 상세 - 대한금융 관리자",
  description: "브리핑 상세 정보를 확인합니다",
};

export default function BriefingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <BriefingDetailClient params={params} />;
}
