//  src/types/api/constants/documentType.ts
export const DocumentType = {
  DOCUMENT: "DOCUMENT",
  PAST_EXAM: "PAST_EXAM",
  SOLUTION: "SOLUTION",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DocumentType = keyof typeof DocumentType;

// 백엔드와 매핑되는 한국어 라벨
export const documentTypeLabels: Record<DocumentType, string> = {
  DOCUMENT: "필기 자료, 교안, 녹화본, 실험/실습 자료 등",
  PAST_EXAM: "퀴즈, 기출 문제, 과제 등",
  SOLUTION: "솔루션 등",
};
