// src/types/api/constants/postTier.ts
export const PostTier = {
  CHEONMIN: "CHEONMIN",
  JUNGIN: "JUNGIN",
  YANGBAN: "YANGBAN",
  KING: "KING",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PostTier = keyof typeof PostTier;
