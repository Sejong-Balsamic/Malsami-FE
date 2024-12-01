"use client";

import { useDispatch } from "react-redux";
import { addToast } from "@/store/toastSlice";
import logOut from "@/apis/auth/logOut";
import { ToastIcon, ToastAction } from "@/components/ui/toast"; // React 컴포넌트 가져오기
import React from "react";

export default function useLogout() {
  const dispatch = useDispatch();

  const showToast = (message: string, color: "blue" | "orange" | "green" = "orange") => {
    const icon = React.createElement(ToastIcon, { color });
    const action = React.createElement(ToastAction, { color, altText: "확인" }, "확인");

    dispatch(
      addToast({
        id: Date.now().toString(),
        icon,
        title: message,
        color,
        action,
      }),
    );
  };

  const handleLogout = async () => {
    try {
      await logOut(); // 기존 로그아웃 함수 호출
      showToast("로그아웃 되었습니다.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch {
      showToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

  return handleLogout;
}
