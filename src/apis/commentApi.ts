import { CommentCommand } from "@/types/api/requests/commentCommand";
import { CommentDto } from "@/types/api/responses/commentDto";
import { postApiRequest } from "./apiUtils";

export const commentApi = {
  saveComment: (c: Partial<CommentCommand>) => postApiRequest<CommentCommand, CommentDto>("/api/comment/post", c),

  getAllCommentsByPostId: (c: Partial<CommentCommand>) =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/get/all", c),

  /** 좋아요 */
  commentLike: (c: Partial<CommentCommand>) => postApiRequest<CommentCommand, CommentDto>("/api/comment/like", c),
};

export default commentApi;
