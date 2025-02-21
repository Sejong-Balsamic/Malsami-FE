import { configureStore } from "@reduxjs/toolkit";
import docHotDownFilterOptions from "@/global/store/docHotDownFilterOptionsSlice";
import docMyFacultyFilterOptions from "@/global/store/docMyFacultyFilterOptionsSlice";
import docRequestFilterOptions from "./docRequestFilterOptionsSlice";
import filterOptions from "./filterOptionsSlice";
import facultyState from "./facultySlice";
import activeTab from "./activeTabSlice";
import toast from "./toastSlice";
import modal from "./modalSlice";
import fcmReducer from "./fcmSlice";

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
