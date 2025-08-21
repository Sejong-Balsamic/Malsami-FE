import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addToast, Toast } from "@/global/store/toastSlice";

export type ToastType = "confirm" | "warning" | "yeopjeon";

const useCommonToast = () => {
  const dispatch = useDispatch();

  const showToast = useCallback(
    (message: string, type: ToastType = "confirm") => {
      const toastData: Toast = {
        id: Date.now().toString(),
        title: message,
        type,
      };

      dispatch(addToast(toastData));
    },
    [dispatch],
  );

  // Toast 타입별 편의 메서드들
  const showConfirmToast = useCallback((message: string) => showToast(message, "confirm"), [showToast]);
  const showWarningToast = useCallback((message: string) => showToast(message, "warning"), [showToast]);
  const showYeopjeonToast = useCallback((message: string) => showToast(message, "yeopjeon"), [showToast]);

  return {
    showToast,
    showConfirmToast,
    showWarningToast,
    showYeopjeonToast,
  };
};

export default useCommonToast;
