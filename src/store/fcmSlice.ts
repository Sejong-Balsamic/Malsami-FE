/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FcmState {
  fcmToken: string | null;
  isFcmTokenSentToServer: boolean;
}

const initialState: FcmState = {
  fcmToken: null,
  isFcmTokenSentToServer: false,
};

const fcmSlice = createSlice({
  name: "fcm",
  initialState,
  reducers: {
    setFcmToken(state, action: PayloadAction<string>) {
      state.fcmToken = action.payload;
    },
    setIsFcmTokenSentToServer(state, action: PayloadAction<boolean>) {
      state.isFcmTokenSentToServer = action.payload;
    },
    resetFcmState(state) {
      state.fcmToken = null;
      state.isFcmTokenSentToServer = false;
    },
  },
});

export const { setFcmToken, setIsFcmTokenSentToServer, resetFcmState } = fcmSlice.actions;
export default fcmSlice.reducer;
