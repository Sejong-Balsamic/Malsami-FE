// src/types/api/constants/popularType.ts
export const PopularType = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
} as const;

export type PopularType = keyof typeof PopularType;
