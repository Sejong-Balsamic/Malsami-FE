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
export const QuestionPresetTagTranslation: Record<QuestionPresetTag, string> = {
  EXAM_PREPARATION: "시험_대비",
  OUT_OF_CLASS: "수업_외_내용",
  UNKNOWN_CONCEPT: "개념_모름",
  BETTER_SOLUTION: "더_나은_풀이",
  DOCUMENT_REQUEST: "자료_요청",
  STUDY_TIPS: "공부_팁",
  ADVICE_REQUEST: "조언_구함",
};
