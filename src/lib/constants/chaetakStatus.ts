// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type ChaetaekStatusKey = "ALL" | "CHAETAEK" | "NO_CHAETAEK";

// 매핑 객체. 객체의 키가 정의된 ChaetaekStatusKey 타입 내에서만 허용.
export const ChaetaekStatus: Record<ChaetaekStatusKey, string> = {
  ALL: "전체",
  CHAETAEK: "채택",
  NO_CHAETAEK: "미채택",
};

export default ChaetaekStatus;
