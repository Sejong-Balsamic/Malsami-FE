// src/types/api/constants/sortType.ts
export const SortType = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  MOST_LIKED: "MOST_LIKED",
  REWARD_YEOPJEON: "REWARD_YEOPJEON",
  REWARD_YEOPJEON_DESCENDING: "REWARD_YEOPJEON_DESCENDING",
  REWARD_YEOPJEON_LATEST: "REWARD_YEOPJEON_LATEST",
  VIEW_COUNT: "VIEW_COUNT",
  COMMENT_COUNT: "COMMENT_COUNT",
  DOWNLOAD_COUNT: "DOWNLOAD_COUNT",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SortType = (typeof SortType)[keyof typeof SortType];

// 백엔드와 매핑되는 한국어 라벨
export const sortTypeLabels: Record<SortType, string> = {
  LATEST: "최신순",
  OLDEST: "과거순",
  MOST_LIKED: "추천순",
  REWARD_YEOPJEON: "엽전 현상금 높은순",
  REWARD_YEOPJEON_DESCENDING: "엽전 현상금 높은순",
  REWARD_YEOPJEON_LATEST: "엽전 현상금 최신순",
  VIEW_COUNT: "조회수 많은순",
  COMMENT_COUNT: "댓글순",
  DOWNLOAD_COUNT: "다운로드순",
};
