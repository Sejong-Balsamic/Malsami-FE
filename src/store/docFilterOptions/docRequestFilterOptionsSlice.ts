/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocFilterOptions } from "@/types/DocFilterOptions";

interface FilterOptionsState {
  docRequestFilterOptions: DocFilterOptions;
}

const initialState: FilterOptionsState = {
  docRequestFilterOptions: {
    docTypes: [],
    sortType: "",
    faculty: "",
  },
};

const docRequestFilterOptionsSlice = createSlice({
  name: "docRequestFilterOptions",
  initialState,
  reducers: {
    setDocRequestFilterOptions: (state, action: PayloadAction<DocFilterOptions>) => {
      state.docRequestFilterOptions = action.payload;
    },
  },
});

export const { setDocRequestFilterOptions } = docRequestFilterOptionsSlice.actions;

export default docRequestFilterOptionsSlice.reducer;
