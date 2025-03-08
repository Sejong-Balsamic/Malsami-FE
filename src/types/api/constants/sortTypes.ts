// src/types/api/sortTypes.ts
export const SortType = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  MOST_LIKED: "MOST_LIKED",
  REWARD_YEOPJEON: "REWARD_YEOPJEON",
  VIEW_COUNT: "VIEW_COUNT",
  COMMENT_COUNT: "COMMENT_COUNT",
  DOWNLOAD_COUNT: "DOWNLOAD_COUNT",
} as const;

export type CommonSortType = (typeof SortType)[keyof typeof SortType];

export const sortTypeLabels: Record<CommonSortType, string> = {
  [SortType.LATEST]: "최신순",
  [SortType.OLDEST]: "과거순",
  [SortType.MOST_LIKED]: "추천순",
  [SortType.REWARD_YEOPJEON]: "엽전 현상금 높은순",
  [SortType.VIEW_COUNT]: "조회수 많은순",
  [SortType.COMMENT_COUNT]: "댓글순",
  [SortType.DOWNLOAD_COUNT]: "다운로드순",
};

// 도메인별 정렬 옵션
export const QnaSortType = ["LATEST", "MOST_LIKED", "REWARD_YEOPJEON", "VIEW_COUNT"] as const;
export const DocSortType = ["LATEST", "MOST_LIKED", "VIEW_COUNT"] as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type QnaSortType = (typeof QnaSortType)[number];
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DocSortType = (typeof DocSortType)[number];
