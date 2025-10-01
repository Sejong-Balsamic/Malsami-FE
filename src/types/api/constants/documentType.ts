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
  DOCUMENT: "강의 자료",
  PAST_EXAM: "과제 기출",
  SOLUTION: "해설",
};
