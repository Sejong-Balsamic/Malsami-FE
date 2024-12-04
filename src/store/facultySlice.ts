/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacultyState {
  faculty: string;
}

const initialState: FacultyState = {
  faculty: "전체",
};

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFaculty(state, action: PayloadAction<string>) {
      state.faculty = action.payload;
    },
  },
});

export const { setFaculty } = facultySlice.actions;
export default facultySlice.reducer;
