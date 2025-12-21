// 브리핑 관련 타입 정의

export type BriefingStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "published"
  | "rejected";

export type PipelineStage =
  | "collecting"
  | "processing"
  | "validating"
  | "pending_approval"
  | "publishing"
  | "completed"
  | "failed";

export type IssueCategory =
  | "interest_rate" // 금리
  | "exchange_rate" // 환율
  | "stock" // 주식
  | "real_estate" // 부동산
  | "economy" // 경제
  | "policy"; // 정책

export interface KeyNumber {
  label: string;
  value: string;
  change?: string; // "+1.2%" or "-0.5%"
  isPositive?: boolean;
}

export interface SourceLink {
  title: string;
  url: string;
  publisher?: string;
}

export interface BriefingIssue {
  id: number;
  briefingId: number;
  order: number;
  factKo: string;
  factEn?: string;
  contextKo: string;
  contextEn?: string;
  impactKo: string;
  impactEn?: string;
  keyNumbers: KeyNumber[];
  sources: SourceLink[];
  category: IssueCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface Briefing {
  id: number;
  date: Date;
  titleKo?: string;
  titleEn?: string;
  summaryKo?: string;
  summaryEn?: string;
  status: BriefingStatus;
  publishedAt?: Date;
  approvedBy?: number;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  issues?: BriefingIssue[];
}

export interface BriefingWithIssues extends Briefing {
  issues: BriefingIssue[];
}

export interface PipelineRun {
  id: number;
  briefingId?: number;
  stage: PipelineStage;
  status: "running" | "success" | "failed";
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  metadata?: Record<string, unknown>;
}

// API 요청/응답 타입
export interface CreateBriefingInput {
  date: Date;
  titleKo?: string;
  titleEn?: string;
  summaryKo?: string;
  summaryEn?: string;
  issues: CreateIssueInput[];
}

export interface CreateIssueInput {
  order: number;
  factKo: string;
  factEn?: string;
  contextKo: string;
  contextEn?: string;
  impactKo: string;
  impactEn?: string;
  keyNumbers: KeyNumber[];
  sources: SourceLink[];
  category: IssueCategory;
}

export interface UpdateBriefingInput {
  titleKo?: string;
  titleEn?: string;
  summaryKo?: string;
  summaryEn?: string;
  status?: BriefingStatus;
}

export interface UpdateIssueInput extends Partial<CreateIssueInput> {
  id: number;
}
