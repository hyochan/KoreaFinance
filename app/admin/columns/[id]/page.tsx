import { Metadata } from "next";
import ColumnDetailClient from "./Client";

export const metadata: Metadata = {
  title: "칼럼 상세 - 대한금융 관리자",
  description: "칼럼 상세 정보를 확인합니다",
};

export default function ColumnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ColumnDetailClient params={params} />;
}
