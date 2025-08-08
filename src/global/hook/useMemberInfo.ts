import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/global/store";
import { setMemberInfo } from "@/global/store/authSlice";
import memberApi from "@/apis/memberApi";

// 회원 정보 캐싱 유효 시간 (30분)
const CACHE_EXPIRY_TIME = 30 * 60 * 1000;

/**
 * 회원 정보를 관리하는 커스텀 훅
 * - Redux에서 회원 정보를 불러옴
 * - 정보가 없거나 만료됐으면 API 호출하여 정보 갱신
 * - 정보 갱신 함수도 제공
 */
export const useMemberInfo = () => {
  const dispatch = useDispatch();
  const { memberInfo, lastFetchTime, isLoggedIn } = useSelector((state: RootState) => state.auth);

  // 정보 유효성 검사 (null이거나 만료됐으면 false)
  const isMemberInfoValid = useCallback(() => {
    if (!memberInfo || !lastFetchTime) return false;
    const now = Date.now();
    return now - lastFetchTime < CACHE_EXPIRY_TIME;
  }, [memberInfo, lastFetchTime]);

  // API에서 회원 정보 가져오기
  const fetchMemberInfo = useCallback(
    async (forceRefresh = false) => {
      try {
        // 이미 유효한 정보가 있고, 강제 갱신이 아니면 기존 정보 사용
        if (isMemberInfoValid() && !forceRefresh) {
          return memberInfo;
        }

        // 로그인되지 않은 상태면 가져오지 않음
        if (!isLoggedIn) {
          return null;
        }

        // API 호출하여 회원 정보 가져오기
        const response = await memberApi.getMyInfo();

        if (response && response.member) {
          // Redux에 회원 정보 저장
          dispatch(setMemberInfo(response.member));
          return response.member;
        }

        return null;
      } catch (error) {
        console.error("회원 정보 가져오기 실패:", error);
        return null;
      }
    },
    [dispatch, memberInfo, isMemberInfoValid, isLoggedIn],
  );

  // 초기 마운트 시 회원 정보 가져오기
  useEffect(() => {
    if (isLoggedIn && !isMemberInfoValid()) {
      fetchMemberInfo();
    }
  }, [isLoggedIn, isMemberInfoValid, fetchMemberInfo]);

  return {
    memberInfo,
    isLoading: isLoggedIn && !memberInfo,
    refresh: () => fetchMemberInfo(true), // 강제 갱신
    fetchMemberInfo, // 일반 갱신 (캐시 유효하면 API 호출 안 함)
  };
};

export default useMemberInfo;
