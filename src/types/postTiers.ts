// 키 목록을 배열로 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
// `as const`를 사용해 각 요소를 리터럴 타입으로 유지하고, 배열을 읽기 전용으로 설정.
export const PostTiersKeys = ["CHEONMIN", "JUNGIN", "YANGBAN", "KING"] as const;

// `PostTiersKeys` 배열의 요소를 기반으로 유니언 타입을 생성.
// 각 키 값은 "CHEONMIN" | "JUNGIN" | "YANGBAN" | "KING"와 같은 유효한 값만 허용.
// 이 타입은 컴파일러가 키 값의 유효성을 검사할 수 있도록 보장.
export type PostTiersKey = (typeof PostTiersKeys)[number];

// 매핑 객체. 객체의 키가 정의된 PostTiersKey 타입 내에서만 허용.
// FIXME: 전체적으로 삭제 필요: types/api/constants/postTires.ts 사용합니다
export const PostTiers: Record<PostTiersKey, { EN: string; KR: string }> = {
  CHEONMIN: { EN: "CHEONMIN", KR: "천민" },
  JUNGIN: { EN: "JUNGIN", KR: "중인" },
  YANGBAN: { EN: "YANGBAN", KR: "양반" },
  KING: { EN: "KING", KR: "왕" },
};

export default PostTiers;
