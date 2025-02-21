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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
