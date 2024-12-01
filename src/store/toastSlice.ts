import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Toast 타입 정의
interface Toast {
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    color?: "blue" | "green" | "orange";
  }

// Slice 상태 타입 정의
interface ToastState {
  toasts: Toast[];
}

// 초기 상태
const initialState: ToastState = {
  toasts: [],
};

// Slice 생성
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
