//  src/types/api/constants/documentType.ts
export const DocumentType = {
  DOCUMENT: "DOCUMENT",
  PAST_EXAM: "PAST_EXAM",
  SOLUTION: "SOLUTION",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DocumentType = keyof typeof DocumentType;
