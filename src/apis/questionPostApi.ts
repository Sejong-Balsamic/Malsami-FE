/* eslint-disable import/prefer-default-export */
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { postApiRequest } from "./apiUtils";

export const questionPostApi = {
  /* ────────────── 글 쓰기/조회 ────────────── */
  saveQuestionPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/post", c),

  getQuestionPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/get", c),

  /* ────────────── 목록 / 필터 ────────────── */
  getAllQuestionPostsNotAnswered: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/unanswered", c),

  /** _모든 "전공별·검색·정렬" 리스트 → filter 하나로 통합_ */
  getFilteredQuestionPosts: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/filter", c),

  /* ────────────── HOT 인기 질문 ────────────── */
  getDailyPopularQuestionPost: () => postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/daily", {}),

  getWeeklyPopularQuestionPost: () => postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/weekly", {}),

  /* ────────────── 좋아요 ────────────── */
  questionBoardLike: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/like", c),

  /* ────────────── 답변 CRUD(컨트롤러 통합) ────────────── */
  saveAnswerPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/post", c),

  getAnswersByQuestion: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/get/all", c),

  chaetaekAnswerPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/chaetaek", c),
};
