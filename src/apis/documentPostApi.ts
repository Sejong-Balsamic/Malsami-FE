// src/apis/documentPostApi.ts
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const documentPostApi = {
  // 자료 게시글 저장
  saveDocumentPost: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/post", command),

  // 일간 인기 자료 게시글 조회 (파라미터 추가)
  getDailyPopularDocumentPost: async (command: Partial<DocumentCommand> = {}): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/daily", command),

  // 주간 인기 자료 게시글 조회
  getWeeklyPopularDocumentPost: async (command: Partial<DocumentCommand> = {}): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/weekly", command),

  // 자료 게시글 조회
  getDocumentPost: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/get", command),

  // 필터링된 자료 게시글 조회
  filteredDocumentPost: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/filter", command),

  // 자료 파일 다운로드 (바이너리 응답 처리 필요 시 별도 처리)
  downloadDocumentFile: async (command: Partial<DocumentCommand>): Promise<any> =>
    postApiRequest<DocumentCommand, any>("/api/document/file/download", command),

  // 핫 다운로드 자료 조회
  getHotDownload: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/hot-download", command),

  // 자료 게시판 좋아요
  documentBoardLike: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/like", command),
};

export default documentPostApi;
