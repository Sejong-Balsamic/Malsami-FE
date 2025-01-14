// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type DocTypesKey = "DOCUMENT" | "PAST_EXAM" | "SOLUTION";

// 매핑 객체. 객체의 키가 정의된 DocumentTypeKey 타입 내에서만 허용.
export const DocTypes: Record<DocTypesKey, string> = {
  DOCUMENT: "자료: 필기 자료, 교안, 녹화본, 실험/실습 자료",
  PAST_EXAM: "기출: 퀴즈, 기출 문제, 과제",
  SOLUTION: "해설: 솔루션",
};

export default DocTypes;
