/* eslint-disable */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태 인터페이스 정의
interface FacultyState {
  selectedFacultyMapByBoard: {
    [board: string]: string; //FIXME: 타입 변환 필요 : board: "question", "document"
  };
  facultiesList: string[]; // 단과대 목록
  isFacultiesFetched: boolean; // 단과대 목록 가져왔는지 여부
}

// 초기 상태 정의
const initialState: FacultyState = {
  selectedFacultyMapByBoard: {}, // 선택된 단과대 없음
  facultiesList: [], // 단과대 목록 비어 있음
  isFacultiesFetched: false, // 단과대 목록 가져오지 않음
};

const facultySlice = createSlice({
  name: "facultyState",
  initialState,
  reducers: {
    // 게시판별 선택 단과대 설정
    setSelectedFaculty: (state, action: PayloadAction<{ board: string; faculty: string }>) => {
      const { board, faculty } = action.payload;
      state.selectedFacultyMapByBoard[board] = faculty;
    },

    // 단과대 목록 설정
    setFacultiesList: (state, action: PayloadAction<string[]>) => {
      state.facultiesList = action.payload;
      state.isFacultiesFetched = true;
    },
  },
});

export const { setSelectedFaculty, setFacultiesList } = facultySlice.actions;
export default facultySlice.reducer;
