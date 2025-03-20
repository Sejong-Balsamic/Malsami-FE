// src/types/api/constants/questionPresetTag.ts
export const QuestionPresetTag = {
  OUT_OF_CLASS: "OUT_OF_CLASS",
  UNKNOWN_CONCEPT: "UNKNOWN_CONCEPT",
  BETTER_SOLUTION: "BETTER_SOLUTION",
  EXAM_PREPARATION: "EXAM_PREPARATION",
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST",
  STUDY_TIPS: "STUDY_TIPS",
  ADVICE_REQUEST: "ADVICE_REQUEST",
} as const;

export type QuestionPresetTag = keyof typeof QuestionPresetTag;
