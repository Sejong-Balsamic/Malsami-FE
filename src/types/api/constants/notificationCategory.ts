// src/types/api/constants/notificationCategory.ts
export const NotificationCategory = {
  COMMON: "COMMON",
  NOTICE: "NOTICE",
  LIKE: "LIKE",
  POPULAR_POST: "POPULAR_POST",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type NotificationCategory = keyof typeof NotificationCategory;
