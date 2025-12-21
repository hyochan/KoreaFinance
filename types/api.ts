// API 응답 타입 정의

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface BriefingListParams extends PaginationParams {
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface SubscriberListParams extends PaginationParams {
  isActive?: boolean;
  locale?: string;
}

// 파이프라인 상태 응답
export interface PipelineStatusResponse {
  currentStage: string;
  isRunning: boolean;
  lastRun?: {
    id: number;
    status: string;
    completedAt?: Date;
  };
  todayBriefing?: {
    id: number;
    status: string;
  };
}

// 대시보드 통계
export interface DashboardStats {
  totalBriefings: number;
  publishedThisMonth: number;
  totalSubscribers: number;
  activeSubscribers: number;
  emailsSentToday: number;
  telegramSentToday: number;
}
