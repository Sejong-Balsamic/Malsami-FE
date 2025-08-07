import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { CommentCommand } from "@/types/api/requests/commentCommand";
import { CommentDto } from "@/types/api/responses/commentDto";
import { postApiRequest } from "./apiUtils";

export const likeApi = {
  // 질문 게시판 좋아요
  questionBoardLike: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/likes/question/board", command),

  // 자료 게시판 좋아요
  documentBoardLike: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/likes/document/board", command),

  // 댓글 좋아요
  commentLike: async (command: Partial<CommentCommand>): Promise<CommentDto> =>
    postApiRequest<CommentCommand, CommentDto>("/api/likes/comment", command),
};

export default likeApi;
