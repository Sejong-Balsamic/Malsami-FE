// src/types/api/constants/notificationCategory.ts
export const NotificationCategory = {
  COMMON: "COMMON",
  NOTICE: "NOTICE",
  LIKE: "LIKE",
  POPULAR_POST: "POPULAR_POST",
} as const;

export type NotificationCategory = keyof typeof NotificationCategory;
