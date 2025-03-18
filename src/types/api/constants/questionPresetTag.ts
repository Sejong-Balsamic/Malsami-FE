// src/types/api/constants/questionPresetTag.ts
export const QuestionPresetTag = {
  OUT_OF_CLASS: "OUT_OF_CLASS", // 수업 외 내용
  UNKNOWN_CONCEPT: "UNKNOWN_CONCEPT", // 개념 모름
  BETTER_SOLUTION: "BETTER_SOLUTION", // 더 나은 풀이
  EXAM_PREPARATION: "EXAM_PREPARATION", // 시험 대비
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST", // 자료 요청
  STUDY_TIPS: "STUDY_TIPS", // 공부 팁
  ADVICE_REQUEST: "ADVICE_REQUEST", // 조언 구함
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type QuestionPresetTag = (typeof QuestionPresetTag)[keyof typeof QuestionPresetTag];

export const questionPresetTagLabels: Record<QuestionPresetTag, string> = {
  [QuestionPresetTag.OUT_OF_CLASS]: "수업 외 내용",
  [QuestionPresetTag.UNKNOWN_CONCEPT]: "개념 모름",
  [QuestionPresetTag.BETTER_SOLUTION]: "더 나은 풀이",
  [QuestionPresetTag.EXAM_PREPARATION]: "시험 대비",
  [QuestionPresetTag.DOCUMENT_REQUEST]: "자료 요청",
  [QuestionPresetTag.STUDY_TIPS]: "공부 팁",
  [QuestionPresetTag.ADVICE_REQUEST]: "조언 구함",
};

/**
 * 한글 -> 코드 변환에 사용 (역방향 매핑)
 * (예: "수업 외 내용" -> "OUT_OF_CLASS")
 */
export const koreanToTagCode: Record<string, QuestionPresetTag> = Object.entries(questionPresetTagLabels).reduce(
  (acc, [code, label]) => {
    acc[label] = code as QuestionPresetTag;
    return acc;
  },
  {} as Record<string, QuestionPresetTag>,
);

/**
 * 한글 라벨 배열을 코드값 배열로 변환하는 함수
 */
export function convertLabelsToTags(koreanLabels: string[]): QuestionPresetTag[] {
  return koreanLabels
    .map(label => koreanToTagCode[label])
    .filter((code): code is QuestionPresetTag => code !== undefined);
}

/**
 * 코드값 배열을 한글 라벨 배열로 변환하는 함수
 */
export function convertTagsToLabels(codes: QuestionPresetTag[]): string[] {
  return codes.map(code => questionPresetTagLabels[code]);
}
