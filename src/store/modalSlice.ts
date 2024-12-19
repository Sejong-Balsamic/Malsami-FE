/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isVisible: boolean;
  content: string | null;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<string>) {
      state.isVisible = true;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isVisible = false;
      state.content = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
