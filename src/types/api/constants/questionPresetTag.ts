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

// 태그 타입 정의
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type QuestionPresetTag = keyof typeof QuestionPresetTag;

// 질문 지정태그 번역
export const QuestionPresetTagLabels: Record<QuestionPresetTag, string> = {
  EXAM_PREPARATION: "시험 대비",
  OUT_OF_CLASS: "수업 외 내용",
  UNKNOWN_CONCEPT: "개념 모름",
  BETTER_SOLUTION: "더 나은 풀이",
  DOCUMENT_REQUEST: "자료 요청",
  STUDY_TIPS: "공부 팁",
  ADVICE_REQUEST: "조언 구함",
};
