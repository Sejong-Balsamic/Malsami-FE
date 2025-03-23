import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { postApiRequest } from "./apiUtils";

export const questionPostApi = {
  // 질문 게시글 저장
  saveQuestionPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/post", command),

  // 질문 게시글 조회
  getQuestionPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/get", command),

  // 모든 질문 게시글 조회
  getAllQuestionPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/get/all", command),

  // 답변 없는 질문 게시글 조회
  getAllQuestionPostsNotAnswered: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/unanswered", command),

  // 필터링된 질문 게시글 조회
  getFilteredQuestionPosts: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/filter", command),

  // 일간 인기 질문 게시글 조회
  getDailyPopularQuestionPost: async (): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/daily", {}),

  // 주간 인기 질문 게시글 조회
  getWeeklyPopularQuestionPost: async (): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/weekly", {}),
};

export default questionPostApi;
