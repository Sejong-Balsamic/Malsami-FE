// src/global/hook/useLogout.ts

"use client";

import authApi from "@/apis/authApi";
import useCommonToast from "@/global/hook/useCommonToast";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@/global/store/authSlice";
import { resetFcmState } from "@/global/store/fcmSlice";
import { RootState } from "@/global/store";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const { showConfirmToast, showWarningToast } = useCommonToast();
  const dispatch = useDispatch();
  const router = useRouter();

  // 전역 FCM 토큰 상태 자동 획득
  const fcmToken = useSelector((state: RootState) => state.fcm.fcmToken);

  const handleLogout = async () => {
    try {
      // 1. 로그아웃 API 호출 시 FCM 토큰이 존재할 경우 포함하여 안전 해제 요청
      await authApi.logout({ fcmToken: fcmToken || "" });

      // 2. 세션스토리지 자산 원스톱 삭제
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("memberId");

      // 3. Redux Store 상태 클렌징 단일 경로 처리
      dispatch(logoutAction());
      dispatch(resetFcmState()); // FCM 상태도 공통 정리

      showConfirmToast("로그아웃 되었습니다.");

      // 4. 안전한 메인화면 이동 리디렉트
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      showWarningToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

  return handleLogout;
}
