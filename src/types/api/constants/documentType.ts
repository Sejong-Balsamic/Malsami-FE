//  src/types/api/constants/documentType.ts
export const DocumentType = {
  DOCUMENT: "DOCUMENT",
  PAST_EXAM: "PAST_EXAM",
  SOLUTION: "SOLUTION",
} as const;

export type DocumentType = keyof typeof DocumentType;
