// src/types/api/constants/likeType.ts
export const LikeType = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE",
} as const;

export type LikeType = keyof typeof LikeType;
