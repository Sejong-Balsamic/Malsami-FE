// src/global/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import docHotDownFilterOptions from "@/global/store/docHotDownFilterOptionsSlice";
import docMyFacultyFilterOptions from "@/global/store/docMyFacultyFilterOptionsSlice";
import docRequestFilterOptions from "@/global/store/docRequestFilterOptionsSlice";
import filterOptions from "@/global/store/filterOptionsSlice";
import facultyState from "@/global/store/facultySlice";
import activeTab from "@/global/store/activeTabSlice";
import toast from "@/global/store/toastSlice";
import modal from "@/global/store/modalSlice";
import fcmReducer from "@/global/store/fcmSlice";
import bottomSheet from "@/global/store/bottomSheetSlice";
import optimalPageSize from "@/global/store/optimalPageSizeSlice";

export const store = configureStore({
  reducer: {
    facultyState,
    filterOptions,
    activeTab,
    toast,
    modal,
    docHotDownFilterOptions,
    docMyFacultyFilterOptions,
    docRequestFilterOptions,
    fcm: fcmReducer,
    bottomSheet,
    optimalPageSize,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
