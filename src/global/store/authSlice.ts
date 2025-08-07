import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  memberId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  memberId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMemberId(state, action: PayloadAction<string | null>) {
      // eslint-disable-next-line no-param-reassign
      state.memberId = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = !!action.payload;
    },
    logout(state) {
      // eslint-disable-next-line no-param-reassign
      state.memberId = null;
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = false;
    },
  },
});

export const { setMemberId, logout } = authSlice.actions;
export default authSlice.reducer;
