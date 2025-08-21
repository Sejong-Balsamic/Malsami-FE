/**
 * @deprecated 이 파일의 함수들은 더 이상 사용되지 않습니다.
 * 새로운 useCommonToast를 사용해주세요.
 *
 * 사용법:
 * import useCommonToast from "@/global/hook/useCommonToast";
 * const { showToast } = useCommonToast();
 * showToast("메시지", "confirm");
 */

import { addToast } from "@/global/store/toastSlice";
import { Dispatch } from "react";

export const showToast = (
  dispatch: Dispatch<any>,
  message: string,
  type: "confirm" | "warning" | "yeopjeon" = "warning",
) => {
  dispatch(
    addToast({
      id: Date.now().toString(),
      title: message,
      type,
    }),
  );
};

// Toast 타입별 편의 함수들
export const showConfirmToast = (dispatch: Dispatch<any>, message: string) => showToast(dispatch, message, "confirm");
export const showWarningToast = (dispatch: Dispatch<any>, message: string) => showToast(dispatch, message, "warning");
export const showYeopjeonToast = (dispatch: Dispatch<any>, message: string) => showToast(dispatch, message, "yeopjeon");
