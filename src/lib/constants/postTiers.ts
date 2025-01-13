// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type PostTiersKey = "CHEONMIN" | "JUNGIN" | "YANGBAN" | "KING";

// 매핑 객체. 객체의 키가 정의된 PostTiersKey 타입 내에서만 허용
export const PostTiers: Record<PostTiersKey, string> = {
  CHEONMIN: "천민",
  JUNGIN: "중인",
  YANGBAN: "양반",
  KING: "왕",
};

export default PostTiers;
