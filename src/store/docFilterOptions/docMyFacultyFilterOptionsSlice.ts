/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocFilterOptions } from "@/types/DocFilterOptions";

interface FilterOptionsState {
  docMyFacultyFilterOptions: DocFilterOptions;
}

const initialState: FilterOptionsState = {
  docMyFacultyFilterOptions: {
    docTypes: [],
    sortType: undefined,
  },
};

const docMyFacultyFilterOptionsSlice = createSlice({
  name: "docMyFacultyFilterOptions",
  initialState,
  reducers: {
    setDocMyFacultyFilterOptions: (state, action: PayloadAction<DocFilterOptions>) => {
      state.docMyFacultyFilterOptions = action.payload;
    },
  },
});

export const { setDocMyFacultyFilterOptions } = docMyFacultyFilterOptionsSlice.actions;

export default docMyFacultyFilterOptionsSlice.reducer;
