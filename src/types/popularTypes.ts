// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type PopularTypesKey = "DAILY" | "WEEKLY";

// 매핑 객체. 객체의 키가 정의된 PopularTypesKey 타입 내에서만 허용
export const PopularTypes: Record<PopularTypesKey, string> = {
  DAILY: "일간",
  WEEKLY: "주간",
};

export default PopularTypes;
