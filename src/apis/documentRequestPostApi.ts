import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const documentRequestPostApi = {
  // 자료 요청 게시글 저장
  saveDocumentRequestPost: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/post", command),

  // 필터링된 자료 요청 게시글 조회
  getFilteredDocumentRequestPosts: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/filter", command),

  // 자료 요청 게시글 조회
  getDocumentRequestPost: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/get", command),
};

export default documentRequestPostApi;
