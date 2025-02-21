// 키 목록을 배열로 정의
export const QnaPresetTagKeys = [
  "OUT_OF_CLASS",
  "UNKNOWN_CONCEPT",
  "BETTER_SOLUTION",
  "EXAM_PREPARATION",
  "DOCUMENT_REQUEST",
  "STUDY_TIPS",
  "ADVICE_REQUEST",
] as const;

// 배열을 기반으로 유니언 타입 생성
export type QnaPresetTagsKey = (typeof QnaPresetTagKeys)[number];

// 매핑 객체. 객체의 키는 QnaPresetTagsKey 타입 내에서만 허용
export const QnaPresetTags: Record<QnaPresetTagsKey, string> = {
  OUT_OF_CLASS: "수업 외 내용",
  UNKNOWN_CONCEPT: "개념 모름",
  BETTER_SOLUTION: "더 나은 풀이",
  EXAM_PREPARATION: "시험 대비",
  DOCUMENT_REQUEST: "자료 요청",
  STUDY_TIPS: "공부 팁",
  ADVICE_REQUEST: "조언 구함",
};

export default QnaPresetTags;
