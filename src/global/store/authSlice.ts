import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "@/types/api/entities/postgres/member";
import { MemberDto } from "@/types/api/responses/memberDto";

interface AuthState {
  memberId: string | null;
  isLoggedIn: boolean;
  memberInfo: Member | null;
  lastFetchTime: number | null; // 마지막 회원정보 가져온 시간 (중복 요청 방지)
  accessInfo: MemberDto | null; // 추가: 엽전 및 권한 등급 전역 캐시 상태
  lastAccessFetchTime: number | null; // 추가: 마지막 권한 가져온 시간
}

const initialState: AuthState = {
  memberId: null,
  isLoggedIn: false,
  memberInfo: null,
  lastFetchTime: null,
  accessInfo: null,
  lastAccessFetchTime: null,
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
    setAccessInfo: (state, action: PayloadAction<MemberDto | null>) => {
      return {
        ...state,
        accessInfo: action.payload,
        lastAccessFetchTime: action.payload ? Date.now() : null,
      };
    },
    logout: state => {
      return {
        ...state,
        memberId: null,
        isLoggedIn: false,
        memberInfo: null,
        lastFetchTime: null,
        accessInfo: null,
        lastAccessFetchTime: null,
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

export const { setMemberId, setMemberInfo, setAccessInfo, logout, updateLastFetchTime } = authSlice.actions;
export default authSlice.reducer;
