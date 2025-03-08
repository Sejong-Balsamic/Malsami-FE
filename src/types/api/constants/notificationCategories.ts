export const NotificationCategory = {
  COMMON: "COMMON",
  NOTICE: "NOTICE",
  LIKE: "LIKE",
  POPULAR_POST: "POPULAR_POST",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];

export const notificationCategoryLabels: Record<
  NotificationCategory,
  { description: string; defaultTitle: string; defaultBody: string }
> = {
  [NotificationCategory.COMMON]: {
    description: "일반 알림",
    defaultTitle: "새로운 알림이 있습니다.",
    defaultBody: "{body}",
  },
  [NotificationCategory.NOTICE]: {
    description: "공지 알림",
    defaultTitle: "새로운 공지사항이 등록되었습니다.",
    defaultBody: "새로운 공지가 등록되었습니다: {title}",
  },
  [NotificationCategory.LIKE]: {
    description: "좋아요 증가",
    defaultTitle: "작성한 글에 좋아요가 증가했습니다",
    defaultBody: "{title} 글의 좋아요가 증가했습니다.",
  },
  [NotificationCategory.POPULAR_POST]: {
    description: "인기글 등록",
    defaultTitle: "작성한 글이 인기글에 올라갔습니다.",
    defaultBody: "{title} 글이 인기글에 올라갔습니다.",
  },
};
