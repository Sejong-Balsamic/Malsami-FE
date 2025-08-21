"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/global/store";
import { removeToast } from "@/global/store/toastSlice";
import Image from "next/image";

export default function CommonToast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // 토스트별 아이콘 맵핑
  const getIconPath = (type: "confirm" | "warning" | "yeopjeon") => {
    const iconMap = {
      confirm: "/icons/confirmToast.svg",
      warning: "/icons/warningToast.svg",
      yeopjeon: "/icons/yeopjeonToast.svg",
    };
    return iconMap[type];
  };

  // 토스트가 추가되면 등장 애니메이션 시작
  useEffect(() => {
    if (toasts.length > 0) {
      setIsVisible(true);
      setIsRemoving(false);
    } else {
      setIsVisible(false);
    }
  }, [toasts.length]);

  // 자동 제거 (2.7초 후 퇴장 시작, 3초 후 완전 제거)
  useEffect(() => {
    let exitTimer: NodeJS.Timeout;
    let removeTimer: NodeJS.Timeout;

    if (toasts.length > 0) {
      // 2.7초 후 퇴장 애니메이션 시작
      exitTimer = setTimeout(() => {
        setIsRemoving(true);
      }, 2700);

      // 3초 후 완전 제거
      removeTimer = setTimeout(() => {
        dispatch(removeToast(toasts[0].id));
      }, 3000);
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  const currentToast = toasts[0]; // 첫 번째 토스트만 표시

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2">
      <div
        className={`mx-5 flex h-10 items-center rounded-lg bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isVisible && !isRemoving ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* 아이콘 */}
        <div className="ml-4 mr-3">
          <Image src={getIconPath(currentToast.type)} alt={`${currentToast.type} icon`} width={16} height={16} />
        </div>

        {/* 텍스트 */}
        <span className="text-SUIT_14 font-bold leading-none text-white">{currentToast.title}</span>
      </div>
    </div>
  );
}
