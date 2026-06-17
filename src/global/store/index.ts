// src/global/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import activeTab from "@/global/store/activeTabSlice";
import toast from "@/global/store/toastSlice";
import modal from "@/global/store/modalSlice";
import fcmReducer from "@/global/store/fcmSlice";
import bottomSheet from "@/global/store/bottomSheetSlice";
import auth from "@/global/store/authSlice";

export const store = configureStore({
  reducer: {
    activeTab,
    toast,
    modal,
    fcm: fcmReducer,
    bottomSheet,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
