import { configureStore } from "@reduxjs/toolkit";
import facultyReducer from "./facultySlice";
import filterOptionsReducer from "./filterOptionsSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    faculty: facultyReducer,
    filterOptions: filterOptionsReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
