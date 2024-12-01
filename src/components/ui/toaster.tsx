/* eslint-disable */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // Redux RootState 타입
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { removeToast } from "@/store/toastSlice"; // removeToast 액션

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

  return (
    <ToastProvider>
      {toasts.map(({ id, icon, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex items-center gap-[10px]">
            {icon && <div className="toast-icon">{icon}</div>} {/* icon 렌더링 */}
            <div className="grid gap-1">
              {title && <ToastTitle className="font-pretendard-semibold text-[14px]">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="font-pretendard-medium text-[12px] text-gray-500">
                  {description}
                </ToastDescription>
              )}
            </div>
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
