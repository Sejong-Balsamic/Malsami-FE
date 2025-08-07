// src/types/api/constants/popularType.ts
export const PopularType = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PopularType = keyof typeof PopularType;
