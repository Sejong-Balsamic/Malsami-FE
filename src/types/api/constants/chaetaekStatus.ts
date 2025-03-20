// src/types/api/constants/chaetaekStatus.ts
export const ChaetaekStatus = {
  ALL: "ALL",
  CHAETAEK: "CHAETAEK",
  NO_CHAETAEK: "NO_CHAETAEK",
} as const;

export type ChaetaekStatus = keyof typeof ChaetaekStatus;
