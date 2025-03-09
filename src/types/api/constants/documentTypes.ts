export const DocumentType = {
  DOCUMENT: "DOCUMENT",
  PAST_EXAM: "PAST_EXAM",
  SOLUTION: "SOLUTION",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const documentTypeLabels: Record<DocumentType, string> = {
  [DocumentType.DOCUMENT]: "자료: 필기 자료, 교안, 녹화본, 실험/실습 자료",
  [DocumentType.PAST_EXAM]: "기출: 퀴즈, 기출 문제, 과제",
  [DocumentType.SOLUTION]: "해설: 솔루션",
};
