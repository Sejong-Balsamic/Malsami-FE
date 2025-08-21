/* eslint-disable */
"use client";

/**
 * @deprecated 이 토스트 시스템은 더 이상 사용되지 않습니다.
 * 새로운 CommonToast와 useCommonToast를 사용해주세요.
 */

import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "@/global/store/toastSlice";
import { RootState } from "@/global/store";
import Image from "next/image";

export function Toaster() {
  // Redux에서 toasts 상태 가져오기
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  // 자동 제거 로직
  toasts.forEach(({ id }) => {
    setTimeout(() => {
      dispatch(removeToast(id)); // Redux 상태에서 제거
    }, 5000); // 5초 후 제거
  });

  // 토스트 타입에 따른 아이콘 선택
  const getToastIcon = (type: "confirm" | "warning" | "yeopjeon") => {
    switch (type) {
      case "confirm":
        return "/icons/confirmToast.svg";
      case "warning":
        return "/icons/warningToast.svg";
      case "yeopjeon":
        return "/icons/yeopjeonToast.svg";
      default:
        return "/icons/confirmToast.svg";
    }
  };

  return (
    <div className="fixed top-4 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2" style={{ width: "calc(100% - 40px)", maxWidth: "600px" }}>
      {toasts.map(({ id, title, type }) => (
        <div
          key={id}
          className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-lg border w-full"
        >
          <Image
            src={getToastIcon(type)}
            alt={`${type} icon`}
            width={20}
            height={20}
          />
          <span className="text-SUIT_14 font-medium text-black">{title}</span>
        </div>
      ))}
    </div>
  );
}
