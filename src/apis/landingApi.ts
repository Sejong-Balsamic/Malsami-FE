import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const landingApi = {
  // 필터링된 질문 게시글 조회
  getFilteredQuestionPosts: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/landing/question", command),

  // 필터링된 자료 게시글 조회
  getFilteredDocumentPosts: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/landing/document", command),

  // 필터링된 자료 요청 게시글 조회
  getFilteredDocumentRequestPosts: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/landing/document-request", command),

  // 일간 인기 질문 게시글 조회
  getDailyPopularQuestionPost: async (): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/landing/popular/question/daily", {}),

  // 주간 인기 질문 게시글 조회
  getWeeklyPopularQuestionPost: async (): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/landing/popular/question/weekly", {}),

  // 일간 인기 자료 게시글 조회
  getDailyPopularDocumentPost: async (): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/landing/popular/document/daily", {}),

  // 주간 인기 자료 게시글 조회
  getWeeklyPopularDocumentPost: async (): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/landing/popular/document/weekly", {}),
};

export default landingApi;
