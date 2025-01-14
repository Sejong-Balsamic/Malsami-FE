/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocFilterOptions } from "@/types/DocFilterOptions";

interface FilterOptionsState {
  docHotDownFilterOptions: DocFilterOptions;
}

const initialState: FilterOptionsState = {
  docHotDownFilterOptions: {
    docTypes: [],
    sortType: "",
  },
};

const docHotDownFilterOptionsSlice = createSlice({
  name: "docHotDownFilterOptions",
  initialState,
  reducers: {
    setDocHotDownFilterOptions: (state, action: PayloadAction<DocFilterOptions>) => {
      state.docHotDownFilterOptions = action.payload;
    },
  },
});

export const { setDocHotDownFilterOptions } = docHotDownFilterOptionsSlice.actions;

export default docHotDownFilterOptionsSlice.reducer;
