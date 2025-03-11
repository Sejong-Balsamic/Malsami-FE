export const LikeType = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LikeType = (typeof LikeType)[keyof typeof LikeType];

export const likeTypeLabels: Record<LikeType, string> = {
  [LikeType.LIKE]: "좋아요",
  [LikeType.DISLIKE]: "싫어요",
};
