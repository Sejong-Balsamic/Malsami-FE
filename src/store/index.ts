import { configureStore } from "@reduxjs/toolkit";
import facultyReducer from "./facultySlice";
import filterOptionsReducer from "./filterOptionsSlice";
import activeTabReducer from "./activeTabSlice";

export const store = configureStore({
  reducer: {
    faculty: facultyReducer,
    filterOptions: filterOptionsReducer,
    activeTab: activeTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
