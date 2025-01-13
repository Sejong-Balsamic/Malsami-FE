// 유니언 타입으로 sortType 키 제한. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type SortTypeKey =
  | "LATEST"
  | "OLDEST"
  | "MOST_LIKED"
  | "REWARD_YEOPJEON"
  | "VIEW_COUNT"
  | "COMMENT_COUNT"
  | "DOWNLOAD_COUNT";

// 매핑 객체. 객체의 키가 정의된 SortTypeKey 타입 내에서만 허용
export const SortTypes: Record<SortTypeKey, string> = {
  LATEST: "최신순",
  OLDEST: "과거순",
  MOST_LIKED: "추천순",
  REWARD_YEOPJEON: "엽전 현상금 높은순",
  VIEW_COUNT: "조회수 많은순",
  COMMENT_COUNT: "댓글순",
  DOWNLOAD_COUNT: "다운로드순",
};

export default SortTypes;
