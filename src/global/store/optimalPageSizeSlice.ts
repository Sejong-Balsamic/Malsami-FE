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

// UI 상수 정의
const UI_CONSTANTS = {
  HEADER_HEIGHT_PIXELS: 64,
  BOTTOM_MARGIN_HEIGHT_PIXELS: 24,
  PAGINATION_SECTION_HEIGHT_PIXELS: 80,
  NOTICE_PINNED_SECTION_HEIGHT: 104,
} as const;

// 카드 높이 상수 정의
const CARD_HEIGHTS = {
  NOTICE: 102,
  DOCUMENT: 120,
  QUESTION: 110,
  COMMENT: 80,
} as const;

// 페이지 크기 제한 상수 정의
const PAGE_SIZE_LIMITS = {
  NOTICE: { min: 4, max: 8 },
  DOCUMENT: { min: 6, max: 10 },
  QUESTION: { min: 5, max: 9 },
  COMMENT: { min: 8, max: 15 },
} as const;

// 헬퍼 함수: 최적 페이지 크기 계산
const calculateOptimalPageSize = (
  availableHeight: number,
  cardHeight: number,
  minSize: number,
  maxSize: number,
): number => {
  return Math.max(minSize, Math.min(maxSize, Math.floor(availableHeight / cardHeight)));
};

// 헬퍼 함수: 사용 가능한 높이 계산
const calculateAvailableHeight = (screenHeightPixels: number, additionalHeightReduction: number = 0): number => {
  return (
    screenHeightPixels -
    UI_CONSTANTS.HEADER_HEIGHT_PIXELS -
    UI_CONSTANTS.PAGINATION_SECTION_HEIGHT_PIXELS -
    UI_CONSTANTS.BOTTOM_MARGIN_HEIGHT_PIXELS -
    additionalHeightReduction
  );
};

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

      // 공지사항 계산 (고정된 상단 섹션 고려)
      const availableNoticeHeight = calculateAvailableHeight(
        screenHeightPixels,
        UI_CONSTANTS.NOTICE_PINNED_SECTION_HEIGHT,
      );
      const optimalNoticePageSize = calculateOptimalPageSize(
        availableNoticeHeight,
        CARD_HEIGHTS.NOTICE,
        PAGE_SIZE_LIMITS.NOTICE.min,
        PAGE_SIZE_LIMITS.NOTICE.max,
      );

      // 자료게시판 계산
      const availableDocumentHeight = calculateAvailableHeight(screenHeightPixels);
      const optimalDocumentPageSize = calculateOptimalPageSize(
        availableDocumentHeight,
        CARD_HEIGHTS.DOCUMENT,
        PAGE_SIZE_LIMITS.DOCUMENT.min,
        PAGE_SIZE_LIMITS.DOCUMENT.max,
      );

      // 질문게시판 계산
      const availableQuestionHeight = calculateAvailableHeight(screenHeightPixels);
      const optimalQuestionPageSize = calculateOptimalPageSize(
        availableQuestionHeight,
        CARD_HEIGHTS.QUESTION,
        PAGE_SIZE_LIMITS.QUESTION.min,
        PAGE_SIZE_LIMITS.QUESTION.max,
      );

      // 댓글 계산 (더 작은 높이)
      const availableCommentHeight = calculateAvailableHeight(screenHeightPixels);
      const optimalCommentPageSize = calculateOptimalPageSize(
        availableCommentHeight,
        CARD_HEIGHTS.COMMENT,
        PAGE_SIZE_LIMITS.COMMENT.min,
        PAGE_SIZE_LIMITS.COMMENT.max,
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
