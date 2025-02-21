// 키 목록을 배열로 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
// `as const`를 사용해 각 요소를 리터럴 타입으로 유지하고, 배열을 읽기 전용으로 설정.
export const ChaetaekStatusKeys = ["ALL", "CHAETAEK", "NO_CHAETAEK"] as const;

// `ChaetaekStatusKeys` 배열의 요소를 기반으로 유니언 타입을 생성.
// 각 키 값은 "ALL" | "CHAETAEK" | "NO_CHAETAEK"와 같은 유효한 값만 허용.
// 이 타입은 컴파일러가 키 값의 유효성을 검사할 수 있도록 보장.
export type ChaetaekStatusKey = (typeof ChaetaekStatusKeys)[number];

// 매핑 객체. 객체의 키가 정의된 ChaetaekStatusKey 타입 내에서만 허용.
export const ChaetaekStatus: Record<ChaetaekStatusKey, string> = {
  ALL: "전체",
  CHAETAEK: "채택",
  NO_CHAETAEK: "미채택",
};

export default ChaetaekStatus;
