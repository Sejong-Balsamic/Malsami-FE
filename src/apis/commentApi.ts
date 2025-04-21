import { CommentCommand } from "@/types/api/requests/commentCommand";
import { CommentDto } from "@/types/api/responses/commentDto";
import { postApiRequest } from "./apiUtils";

export const commentApi = {
  // 댓글 저장
  saveComment: async (command: Partial<CommentCommand>): Promise<CommentDto> =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/post", command),

  // 게시물 ID로 모든 댓글 조회
  getAllCommentsByPostId: async (command: Partial<CommentCommand>): Promise<CommentDto> =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/get/all", command),

  // 댓글 좋아요
  commentLike: async (command: Partial<CommentCommand>): Promise<CommentDto> =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/like", command),
};

export default commentApi;
