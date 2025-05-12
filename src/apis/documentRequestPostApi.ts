import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const documentRequestPostApi = {
  saveDocumentRequestPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/post", c),

  getDocumentRequestPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/get", c),

  /** 리스트 (필터) */
  getFilteredDocumentRequestPosts: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document-request/filter", c),
};

export default documentRequestPostApi;
