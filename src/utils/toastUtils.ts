import { ToastIcon, ToastAction } from "@/components/ui/toast";
import { addToast } from "@/store/toastSlice";
import React, { Dispatch } from "react";

// eslint-disable-next-line import/prefer-default-export
export const showToast = (dispatch: Dispatch<any>, message: string, color: "blue" | "orange" | "green" = "orange") => {
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
