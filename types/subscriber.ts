// 구독자 관련 타입 정의

export interface Subscriber {
  id: number;
  email: string;
  name?: string;
  locale: "ko" | "en";
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  telegramChatId?: string;
  preferences?: SubscriberPreferences;
}

export interface SubscriberPreferences {
  emailEnabled: boolean;
  telegramEnabled: boolean;
  categories?: string[]; // 관심 카테고리
}

export interface CreateSubscriberInput {
  email: string;
  name?: string;
  locale?: "ko" | "en";
  telegramChatId?: string;
}

export interface UpdateSubscriberInput {
  name?: string;
  locale?: "ko" | "en";
  isActive?: boolean;
  telegramChatId?: string;
  preferences?: SubscriberPreferences;
}

export interface NotificationLog {
  id: number;
  briefingId: number;
  subscriberId: number;
  channel: "email" | "telegram";
  status: "sent" | "failed" | "bounced";
  sentAt?: Date;
  error?: string;
}
