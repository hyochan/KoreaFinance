import { Metadata } from "next";
import ColumnsClient from "./Client";

export const metadata: Metadata = {
  title: "칼럼 관리 - 대한금융 관리자",
  description: "애널리스트별 칼럼을 생성하고 관리합니다",
};

export default function ColumnsPage() {
  return <ColumnsClient />;
}
