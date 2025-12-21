import { Metadata } from "next";
import ActorsClient from "./Client";

export const metadata: Metadata = {
  title: "배우 관리 - 대한금융 관리자",
  description: "AI 배우(애널리스트, 감독관, 고객)의 성격과 프롬프트를 설계합니다",
};

export default function ActorsPage() {
  return <ActorsClient />;
}
