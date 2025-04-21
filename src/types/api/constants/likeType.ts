// src/types/api/constants/likeType.ts
export const LikeType = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LikeType = keyof typeof LikeType;
