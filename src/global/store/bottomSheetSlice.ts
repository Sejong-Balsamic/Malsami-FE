/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BottomSheetState {
  isOpen: boolean;
  documentFilteringOpen: boolean;
  questionFilteringOpen: boolean;
}

const initialState: BottomSheetState = {
  isOpen: false,
  documentFilteringOpen: false,
  questionFilteringOpen: false,
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setDocumentFilteringOpen: (state, action: PayloadAction<boolean>) => {
      state.documentFilteringOpen = action.payload;
    },
    setQuestionFilteringOpen: (state, action: PayloadAction<boolean>) => {
      state.questionFilteringOpen = action.payload;
    },
  },
});

export const { setIsOpen, setDocumentFilteringOpen, setQuestionFilteringOpen } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
