import { configureStore } from "@reduxjs/toolkit";
import docHotDownFilterOptions from "@/store/docFilterOptions/docHotDownFilterOptionsSlice";
import docMyFacultyFilterOptions from "@/store/docFilterOptions/docMyFacultyFilterOptionsSlice";
import docRequestFilterOptions from "./docFilterOptions/docRequestFilterOptionsSlice";
import filterOptions from "./filterOptionsSlice";
import facultyState from "./facultySlice";
import activeTab from "./activeTabSlice";
import toast from "./toastSlice";
import modal from "./modalSlice";

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
