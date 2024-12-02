import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveTabState {
  activeTab: "자료게시판" | "질문게시판";
}

const initialState: ActiveTabState = {
  activeTab: "자료게시판", // 디폴트
};

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<"자료게시판" | "질문게시판">) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
