import { configureStore } from "@reduxjs/toolkit";
import docHotDownFilterOptionsReducer from "@/store/docFilterOptions/docHotDownFilterOptionsSlice";
import docMyFacultyFilterOptionsReducer from "@/store/docFilterOptions/docMyFacultyFilterOptionsSlice";
import docRequestFilterOptionsReducer from "./docFilterOptions/docRequestFilterOptionsSlice";
import filterOptionsReducer from "./filterOptionsSlice";
import facultyState from "./facultySlice";
import activeTabReducer from "./activeTabSlice";
import toastReducer from "./toastSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    facultyState,
    filterOptions: filterOptionsReducer,
    activeTab: activeTabReducer,
    toast: toastReducer,
    modal: modalReducer,
    docHotDownFilterOptions: docHotDownFilterOptionsReducer,
    docMyFacultyFilterOptions: docMyFacultyFilterOptionsReducer,
    docRequestFilterOptions: docRequestFilterOptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
