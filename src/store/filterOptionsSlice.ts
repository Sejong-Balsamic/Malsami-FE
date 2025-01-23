import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";

const initialState: QnaFilterOptions = {
  chaetaekStatus: undefined,
  qnaPresetTags: [],
  sortType: undefined,
};

const filterOptionsSlice = createSlice({
  name: "filterOptions",
  initialState,
  reducers: {
    setFilterOptions(state, action: PayloadAction<QnaFilterOptions>) {
      return action.payload;
    },
  },
});

export const { setFilterOptions } = filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;
