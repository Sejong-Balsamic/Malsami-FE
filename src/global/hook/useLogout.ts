"use client";

import authApi from "@/apis/authApi";
import useCommonToast from "@/global/hook/useCommonToast";

export default function useLogout() {
  const { showConfirmToast, showWarningToast } = useCommonToast();

  const handleLogout = async () => {
    try {
      await authApi.logout({}); // 기존 로그아웃 함수 호출
      showConfirmToast("로그아웃 되었습니다.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch {
      showWarningToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

  return handleLogout;
}
