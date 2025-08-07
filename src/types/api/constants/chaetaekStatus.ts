// src/types/api/constants/chaetaekStatus.ts
export const ChaetaekStatus = {
  ALL: "ALL",
  CHAETAEK: "CHAETAEK",
  NO_CHAETAEK: "NO_CHAETAEK",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ChaetaekStatus = keyof typeof ChaetaekStatus;

// 백엔드와 매핑되는 한국어 라벨
export const chaetaekStatusLabels: Record<ChaetaekStatus, string> = {
  ALL: "전체",
  CHAETAEK: "채택",
  NO_CHAETAEK: "미채택",
};
