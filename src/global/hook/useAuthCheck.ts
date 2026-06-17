// src/global/hook/useAuthCheck.ts

"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { showModal } from "../store/modalSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  // 세션스토리지 토큰 존재 여부로 로그인 판별
  const getIsLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem("accessToken");
  };

  // 로그인 상태 가드 (비로그인 시 로그인 필요 모달을 띄움)
  const requireAuth = (customMessage = "로그인 후 이용가능합니다."): boolean => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      dispatch(showModal(customMessage));
      return false;
    }
    return true;
  };

  return {
    isLoggedIn: getIsLoggedIn(),
    memberId: authState.memberId,
    requireAuth,
  };
}
