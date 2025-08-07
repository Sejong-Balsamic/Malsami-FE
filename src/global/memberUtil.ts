import { store } from "@/global/store";
import { setMemberId } from "@/global/store/authSlice";

export const MEMBER_ID_SESSION_KEY = "memberId";

/**
 * 로그인한 사용자의 memberId를 Redux 및 sessionStorage에 저장합니다.
 */
export function saveLoggedInMemberId(memberId: string): void {
  if (!memberId) return;
  // Redux 저장
  store.dispatch(setMemberId(memberId));
  // sessionStorage 백업(새로고침 시 복구용)
  sessionStorage.setItem(MEMBER_ID_SESSION_KEY, memberId);
}

/**
 * Redux의 authSlice → sessionStorage 순으로 memberId를 조회해 동일 회원인지 판단합니다.
 */
export function isSameMemberById(targetMemberId?: string | null): boolean {
  if (!targetMemberId) return false;
  const state = store.getState();
  const loggedInMemberId = (state as any).auth?.memberId ?? sessionStorage.getItem(MEMBER_ID_SESSION_KEY);
  return loggedInMemberId === targetMemberId;
}

/**
 * member 객체를 받아 동일 회원인지 확인합니다.
 */
export function isSameMemberByMemberObject({ memberId }: { memberId?: string | null }): boolean {
  return isSameMemberById(memberId);
}
