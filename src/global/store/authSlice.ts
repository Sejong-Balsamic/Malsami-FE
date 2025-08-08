import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "@/types/api/entities/postgres/member";

interface AuthState {
  memberId: string | null;
  isLoggedIn: boolean;
  memberInfo: Member | null;
  lastFetchTime: number | null; // 마지막 회원정보 가져온 시간 (중복 요청 방지)
}

const initialState: AuthState = {
  memberId: null,
  isLoggedIn: false,
  memberInfo: null,
  lastFetchTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMemberId: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        memberId: action.payload,
        isLoggedIn: !!action.payload,
      };
    },
    setMemberInfo: (state, action: PayloadAction<Member | null>) => {
      return {
        ...state,
        memberInfo: action.payload,
        lastFetchTime: action.payload ? Date.now() : null,
      };
    },
    logout: state => {
      return {
        ...state,
        memberId: null,
        isLoggedIn: false,
        memberInfo: null,
        lastFetchTime: null,
      };
    },
    updateLastFetchTime: state => {
      return {
        ...state,
        lastFetchTime: Date.now(),
      };
    },
  },
});

export const { setMemberId, setMemberInfo, logout, updateLastFetchTime } = authSlice.actions;
export default authSlice.reducer;
