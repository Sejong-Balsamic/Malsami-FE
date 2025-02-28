/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BottomSheetState {
  isOpen: boolean;
}

const initialState: BottomSheetState = {
  isOpen: false,
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
