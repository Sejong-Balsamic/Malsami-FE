// 정렬 옵션 키를 관리하는 중심 객체. as const를 사용해 각 값이 문자열 리터럴 타입으로 유지되도록 설정
export const SortTypes = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  MOST_LIKED: "MOST_LIKED",
  REWARD_YEOPJEON: "REWARD_YEOPJEON",
  VIEW_COUNT: "VIEW_COUNT",
  COMMENT_COUNT: "COMMENT_COUNT",
  DOWNLOAD_COUNT: "DOWNLOAD_COUNT",
} as const;

// SORT_TYPES 객체의 키들을 유니언 타입으로 추출
// 이 타입은 SORT_TYPES의 유효한 키만 허용하는 역할
export type SortTypeKey = keyof typeof SortTypes;

// SortTypeKey 타입의 각 키에 대해 한글 라벨을 매핑
// UI에서 사용자에게 보여줄 라벨 정보를 관리
export const sortTypeLabels: Record<SortTypeKey, string> = {
  LATEST: "최신순",
  OLDEST: "과거순",
  MOST_LIKED: "추천순",
  REWARD_YEOPJEON: "엽전 현상금 높은순",
  VIEW_COUNT: "조회수 많은순",
  COMMENT_COUNT: "댓글순",
  DOWNLOAD_COUNT: "다운로드순",
};

// 도메인별 필요한 키 정의
// 각각 읽기 전용 배열로 정의되며, 특정 도메인에서 사용되는 정렬 옵션만 포함
// 데이터로 사용. 런타임에서 데이터를 순회하거나 UI를 생성할 때 활용
export const QnaSortTypeKeys = ["LATEST", "MOST_LIKED", "REWARD_YEOPJEON", "VIEW_COUNT"] as const;
export const DocSortTypeKeys = ["LATEST", "MOST_LIKED", "VIEW_COUNT"] as const;

// 도메인별 타입 추출
// QNA_SORT_TYPES와 DOC_SORT_TYPES 배열의 요소를 유니언 타입으로 추출
// 각각 "LATEST" | "MOST_LIKED" | "REWARD_YEOPJEON" | "VIEW_COUNT" 와 같은 타입을 생성
// 각 도메인에서 허용되는 정렬 키를 타입으로 명확히 제한할 수 있다
// 타입으로 사용. 컴파일 타임에 데이터의 유효성을 검증하여 타입 안정성을 보장
export type QnaSortTypeKey = (typeof QnaSortTypeKeys)[number];
export type DocSortTypeKey = (typeof DocSortTypeKeys)[number];
