/* eslint-disable */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Redux RootState 타입
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  // Redux에서 toasts 상태 가져오기
  const toasts = useSelector((state: RootState) => state.toast.toasts);

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
