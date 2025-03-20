// src/types/api/constants/sortType.ts
export const SortType = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  MOST_LIKED: "MOST_LIKED",
  REWARD_YEOPJEON: "REWARD_YEOPJEON",
  VIEW_COUNT: "VIEW_COUNT",
  COMMENT_COUNT: "COMMENT_COUNT",
  DOWNLOAD_COUNT: "DOWNLOAD_COUNT",
} as const;

export type SortType = keyof typeof SortType;
