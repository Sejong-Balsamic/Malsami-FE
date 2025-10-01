import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { CommentCommand } from "@/types/api/requests/commentCommand";
import { CommentDto } from "@/types/api/responses/commentDto";
import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";
import { postApiRequest } from "./apiUtils";

export const likeApi = {
  // 질문 게시판 좋아요 (질문글, 답변글 모두)
  questionBoardLike: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/like", command),

  // 자료 게시판 좋아요
  documentBoardLike: async (command: Partial<DocumentCommand>): Promise<DocumentDto> =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/like", command),

  // 공지사항 좋아요
  noticeBoardLike: async (command: Partial<NoticePostCommand>): Promise<NoticePostDto> =>
    postApiRequest<NoticePostCommand, NoticePostDto>("/api/notice/like", command),

  // 공지사항 좋아요 취소
  cancelNoticeBoardLike: async (command: Partial<NoticePostCommand>): Promise<void> =>
    postApiRequest<NoticePostCommand, void>("/api/notice/like/cancel", command),

  // 댓글 좋아요
  commentLike: async (command: Partial<CommentCommand>): Promise<CommentDto> =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/like", command),
};

export default likeApi;
