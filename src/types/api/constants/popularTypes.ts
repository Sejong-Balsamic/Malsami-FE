export const PopularType = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PopularType = (typeof PopularType)[keyof typeof PopularType];

export const popularTypeLabels: Record<PopularType, string> = {
  [PopularType.DAILY]: "일간",
  [PopularType.WEEKLY]: "주간",
};
