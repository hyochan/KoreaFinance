// 공통 타입 정의
// Convex 스키마 기반 타입

export type ActorRole = "analyst" | "supervisor" | "customer";

export type ColumnStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "REVISION"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED";

export type BriefingStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED";

export type PipelineStage =
  | "COLLECTING"
  | "PROCESSING"
  | "VALIDATING"
  | "PENDING_APPROVAL"
  | "PUBLISHING"
  | "COMPLETED"
  | "FAILED";

export type LearningType = "positive" | "negative" | "suggestion";

export type ReviewerType = "ai" | "human";

export type ReviewVerdict = "approve" | "revision" | "reject";

export type ResponseType = "question" | "opinion" | "feedback" | "share";

export type Sentiment = "positive" | "neutral" | "negative" | "curious";

// JSON 타입
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// 카테고리 레이블
export const categoryLabels: Record<string, string> = {
  korean_stock: "한국주식",
  us_stock: "미국주식",
  bitcoin: "비트코인",
  interest_rate: "금리",
  exchange_rate: "환율",
  issue: "이슈",
};

// 상태 레이블
export const statusLabels: Record<string, string> = {
  DRAFT: "초안",
  PENDING_REVIEW: "검토 대기",
  REVISION: "수정 요청",
  APPROVED: "승인됨",
  PUBLISHED: "발행됨",
  REJECTED: "거부됨",
};

// 상태 색상
export const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-700",
  REVISION: "bg-orange-100 text-orange-700",
  APPROVED: "bg-blue-100 text-blue-700",
  PUBLISHED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};
