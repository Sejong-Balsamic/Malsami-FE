export const PostTier = {
  CHEONMIN: "CHEONMIN",
  JUNGIN: "JUNGIN",
  YANGBAN: "YANGBAN",
  KING: "KING",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PostTier = (typeof PostTier)[keyof typeof PostTier];

export const postTierLabels: Record<PostTier, string> = {
  [PostTier.CHEONMIN]: "천민",
  [PostTier.JUNGIN]: "중인",
  [PostTier.YANGBAN]: "양반",
  [PostTier.KING]: "왕",
};
