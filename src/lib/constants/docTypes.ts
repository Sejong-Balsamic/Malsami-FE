// 키 목록을 배열로 정의
export const DocTypesKeys = ["DOCUMENT", "PAST_EXAM", "SOLUTION"] as const;

// 배열을 기반으로 유니언 타입 생성
export type DocTypesKey = (typeof DocTypesKeys)[number];

// 매핑 객체. 객체의 키는 DocTypesKey 타입 내에서만 허용
export const DocTypes: Record<DocTypesKey, string> = {
  DOCUMENT: "자료: 필기 자료, 교안, 녹화본, 실험/실습 자료",
  PAST_EXAM: "기출: 퀴즈, 기출 문제, 과제",
  SOLUTION: "해설: 솔루션",
};

export default DocTypes;
