// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type AccountStatusKey = "ACTIVE" | "DELETED";

// 매핑 객체. 객체의 키가 정의된 AccountStatusKey 타입 내에서만 허용.
export const AccountStatuses: Record<AccountStatusKey, string> = {
  ACTIVE: "활성화된 계정",
  DELETED: "삭제된 계정",
};

export default AccountStatuses;
