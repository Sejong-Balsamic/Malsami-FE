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

  // 질문 게시판 좋아요
  questionBoardLike: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/like", command),

  // 답변글 저장
  saveAnswerPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/post", command),

  // 질문에 대한 답변글 조회
  getAnswersByQuestion: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/get/all", command),

  // 채택된 답변글 처리
  chaetaekAnswerPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/answer/chaetaek", command),
};

export default questionPostApi;
