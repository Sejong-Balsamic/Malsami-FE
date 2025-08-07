import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const documentPostApi = {
  /* 글 쓰기/조회 */
  saveDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/post", c),

  getDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/get", c),

  /* 필터 리스트  */
  filteredDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/filter", c),

  /* HOT 인기 자료 */
  getDailyPopularDocumentPost: () => postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/daily", {}),

  getWeeklyPopularDocumentPost: () => postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/weekly", {}),

  /* HOT 다운로드 */
  getHotDownload: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/hot-download", c),

  /* 좋아요 / 싫어요 */
  documentBoardLike: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/like", c),

  /* 파일 다운로드 */
  downloadDocumentFile: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, any>("/api/document/file/download", c),
};

export default documentPostApi;
