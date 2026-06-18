// src/global/hook/useApiErrorHandler.ts

"use client";

import { isApiError } from "@/apis/apiUtils";
import { useRouter } from "next/navigation";
import useCommonToast from "./useCommonToast";

export default function useApiErrorHandler() {
  const { showWarningToast } = useCommonToast();
  const router = useRouter();

  const handleApiError = (
    error: unknown,
    fallbackMessage = "알 수 없는 오류가 발생했습니다.",
    shouldNavigateBack = false,
  ) => {
    let message = fallbackMessage;

    if (isApiError(error)) {
      const status = error.response?.status;
      const errorCode = error.response?.data?.errorCode;

      // 401, 403 에러나 MISSING_REFRESH_TOKEN 등 인증 오류는 appClient가 로그인 모달을 띄우므로
      // 중복 토스트는 생략하고, shouldNavigateBack이 켜진 경우에 한해 리다이렉트나 백 처리만 수행
      if (status === 401 || status === 403 || errorCode === "MISSING_REFRESH_TOKEN") {
        if (shouldNavigateBack) {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.replace("/");
          }
        }
        return error.response?.data?.errorMessage || "인증 세션이 유효하지 않습니다.";
      }

      message = error.response?.data?.errorMessage || fallbackMessage;
    }

    // 일반 API 에러 발생 시 노란색 경고 토스트 표준 노출
    showWarningToast(message);

    if (shouldNavigateBack) {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.replace("/");
      }
    }

    return message;
  };

  return { handleApiError };
}
