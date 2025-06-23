import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 게시판 타입 정의
export type BoardType =
  | "NOTICE" // 공지사항
  | "DOCUMENT" // 자료게시판
  | "QUESTION" // 질문게시판
  | "DOCUMENT_HOT" // 자료게시판 인기글
  | "QUESTION_HOT" // 질문게시판 인기글
  | "MY_POST" // 내 게시글
  | "MY_COMMENT" // 내 댓글
  | "SEARCH_RESULT"; // 검색 결과

// 각 게시판별 페이지 크기 상태
interface OptimalPageSizeState {
  pageSizeByBoardType: Record<BoardType, number>;
  isCalculationCompleted: boolean;
  screenHeightPixels: number;
}

// 초기 상태 - 기본값 설정
const initialState: OptimalPageSizeState = {
  pageSizeByBoardType: {
    NOTICE: 6, // 공지사항 기본 6개
    DOCUMENT: 8, // 자료게시판 기본 8개
    QUESTION: 7, // 질문게시판 기본 7개
    DOCUMENT_HOT: 8, // 자료게시판 인기글 8개
    QUESTION_HOT: 7, // 질문게시판 인기글 7개
    MY_POST: 8, // 내 게시글 8개
    MY_COMMENT: 10, // 내 댓글 10개 (댓글은 더 작음)
    SEARCH_RESULT: 8, // 검색 결과 8개
  },
  isCalculationCompleted: false,
  screenHeightPixels: 0,
};

const optimalPageSizeSlice = createSlice({
  name: "optimalPageSize",
  initialState,
  reducers: {
    // 화면 크기 기반으로 모든 게시판의 최적 페이지 크기 계산
    calculateOptimalPageSizesForAllBoards: (state, action: PayloadAction<{ screenHeightPixels: number }>) => {
      const { screenHeightPixels } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.screenHeightPixels = screenHeightPixels;

      // 각 게시판별 고정 높이 상수들
      const HEADER_HEIGHT_PIXELS = 64;
      const BOTTOM_MARGIN_HEIGHT_PIXELS = 24;
      const PAGINATION_SECTION_HEIGHT_PIXELS = 80;

      // 공지사항 계산
      const NOTICE_PINNED_SECTION_HEIGHT = 104;
      const NOTICE_CARD_HEIGHT = 102;
      const availableNoticeHeight =
        screenHeightPixels -
        HEADER_HEIGHT_PIXELS -
        NOTICE_PINNED_SECTION_HEIGHT -
        PAGINATION_SECTION_HEIGHT_PIXELS -
        BOTTOM_MARGIN_HEIGHT_PIXELS;
      const optimalNoticePageSize = Math.max(4, Math.min(8, Math.floor(availableNoticeHeight / NOTICE_CARD_HEIGHT)));

      // 자료게시판 계산
      const DOCUMENT_CARD_HEIGHT = 120;
      const availableDocumentHeight =
        screenHeightPixels - HEADER_HEIGHT_PIXELS - PAGINATION_SECTION_HEIGHT_PIXELS - BOTTOM_MARGIN_HEIGHT_PIXELS;
      const optimalDocumentPageSize = Math.max(
        6,
        Math.min(10, Math.floor(availableDocumentHeight / DOCUMENT_CARD_HEIGHT)),
      );

      // 질문게시판 계산
      const QUESTION_CARD_HEIGHT = 110;
      const availableQuestionHeight =
        screenHeightPixels - HEADER_HEIGHT_PIXELS - PAGINATION_SECTION_HEIGHT_PIXELS - BOTTOM_MARGIN_HEIGHT_PIXELS;
      const optimalQuestionPageSize = Math.max(
        5,
        Math.min(9, Math.floor(availableQuestionHeight / QUESTION_CARD_HEIGHT)),
      );

      // 댓글 계산 (더 작은 높이)
      const COMMENT_ITEM_HEIGHT = 80;
      const availableCommentHeight =
        screenHeightPixels - HEADER_HEIGHT_PIXELS - PAGINATION_SECTION_HEIGHT_PIXELS - BOTTOM_MARGIN_HEIGHT_PIXELS;
      const optimalCommentPageSize = Math.max(
        8,
        Math.min(15, Math.floor(availableCommentHeight / COMMENT_ITEM_HEIGHT)),
      );

      // 계산된 값들을 상태에 저장
      // eslint-disable-next-line no-param-reassign
      state.pageSizeByBoardType = {
        NOTICE: optimalNoticePageSize,
        DOCUMENT: optimalDocumentPageSize,
        QUESTION: optimalQuestionPageSize,
        DOCUMENT_HOT: optimalDocumentPageSize,
        QUESTION_HOT: optimalQuestionPageSize,
        MY_POST: optimalDocumentPageSize,
        MY_COMMENT: optimalCommentPageSize,
        SEARCH_RESULT: optimalDocumentPageSize,
      };

      // eslint-disable-next-line no-param-reassign
      state.isCalculationCompleted = true;
    },

    // 특정 게시판의 페이지 크기 수동 설정
    setPageSizeForSpecificBoard: (state, action: PayloadAction<{ boardType: BoardType; pageSize: number }>) => {
      const { boardType, pageSize } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.pageSizeByBoardType[boardType] = pageSize;
    },

    // 초기화
    resetOptimalPageSizes: state => {
      // eslint-disable-next-line no-param-reassign
      state.pageSizeByBoardType = initialState.pageSizeByBoardType;
      // eslint-disable-next-line no-param-reassign
      state.isCalculationCompleted = false;
      // eslint-disable-next-line no-param-reassign
      state.screenHeightPixels = 0;
    },
  },
});

export const { calculateOptimalPageSizesForAllBoards, setPageSizeForSpecificBoard, resetOptimalPageSizes } =
  optimalPageSizeSlice.actions;

export default optimalPageSizeSlice.reducer;
