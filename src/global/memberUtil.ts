import { store } from "@/global/store";
import { RootState } from "@/global/store";
import { setMemberId, setMemberInfo } from "@/global/store/authSlice";
import memberApi from "@/apis/memberApi";
import { Member } from "@/types/api/entities/postgres/member";

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
  
  // 사용자 정보도 가져오기
  fetchAndSaveMemberInfo();
}

/**
 * 회원 정보를 API로 가져와서 Redux에 저장합니다.
 * 중복 요청 방지를 위해 이미 정보가 있고 유효하면 가져오지 않습니다.
 */
export async function fetchAndSaveMemberInfo(forceRefresh = false): Promise<Member | null> {
  const state = store.getState() as RootState;
  const { memberInfo, lastFetchTime } = state.auth;

  // 강제 갱신이 아니고, 캐싱된 정보가 유효하면 바로 반환
  const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30분
  const now = Date.now();
  
  if (!forceRefresh && memberInfo && lastFetchTime && (now - lastFetchTime < CACHE_EXPIRY_TIME)) {
    return memberInfo;
  }

  try {
    // API 호출하여 회원 정보 가져오기
    const response = await memberApi.getMyInfo();
    
    if (response && response.member) {
      // Redux에 회원 정보 저장
      store.dispatch(setMemberInfo(response.member));
      return response.member;
    }
    
    return null;
  } catch (error) {
    console.error('회원 정보 가져오기 실패:', error);
    return null;
  }
}

/**
 * Redux의 authSlice → sessionStorage 순으로 memberId를 조회해 동일 회원인지 판단합니다.
 */
export function isSameMemberById(targetMemberId?: string | null): boolean {
  if (!targetMemberId) return false;
  const state = store.getState() as RootState;
  const loggedInMemberId = state.auth?.memberId ?? sessionStorage.getItem(MEMBER_ID_SESSION_KEY);
  return loggedInMemberId === targetMemberId;
}

/**
 * member 객체를 받아 동일 회원인지 확인합니다.
 */
export function isSameMemberByMemberObject({ memberId }: { memberId?: string | null }): boolean {
  return isSameMemberById(memberId);
}

/**
 * API 응답에서 제공되는 isAuthor(boolean) 플래그 또는 memberId 값을 통해
 * 현재 로그인 사용자가 작성자인지 공통으로 판단합니다.
 * - isAuthor 값이 명확히 주어지면 우선적으로 사용합니다.
 * - 불분명할 경우(memberId만 존재) isSameMemberById 로 fallback 합니다.
 */
export function isMyContent({
  isAuthorFlag,
  memberId,
}: {
  isAuthorFlag?: boolean | null;
  memberId?: string | null;
}): boolean {
  // isAuthorFlag 가 true/false 인 경우 그대로 사용 (undefined/null 이면 무시)
  if (typeof isAuthorFlag === "boolean") {
    return isAuthorFlag;
  }
  return isSameMemberById(memberId);
}

/**
 * 현재 로그인한 사용자의 회원 정보를 가져옵니다.
 * Redux 캐싱을 활용하며, 없으면 API를 호출하여 가져옵니다.
 */
export async function getCurrentMemberInfo(): Promise<Member | null> {
  // 이미 구현된 함수 활용
  return fetchAndSaveMemberInfo(false);
}
