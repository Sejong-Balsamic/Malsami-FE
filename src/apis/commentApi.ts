import { CommentCommand } from "@/types/api/requests/commentCommand";
import { CommentDto } from "@/types/api/responses/commentDto";
import { postApiRequest } from "./apiUtils";

export const commentApi = {
  /**
   * 댓글 등록
   * Content-Type: multipart/form-data
   * 필수: content, postId, contentType
   * 선택: isPrivate (기본값: false)
   */
  saveComment: (c: Partial<CommentCommand>) => 
    postApiRequest<CommentCommand, CommentDto>("/api/comment/post", c),

  /**
   * 특정 글에 작성된 댓글 조회 (최신순)
   * Content-Type: multipart/form-data
   * 필수: postId, contentType
   * 선택: pageNumber (기본값: 0), pageSize (기본값: 30)
   */
  getAllCommentsByPostId: (c: Partial<CommentCommand>) =>
    postApiRequest<CommentCommand, CommentDto>("/api/comment/get/all", c),

  /**
   * 댓글 좋아요
   * Content-Type: multipart/form-data
   * 필수: postId (댓글 PK)
   */
  commentLike: (c: Partial<CommentCommand>) => 
    postApiRequest<CommentCommand, CommentDto>("/api/comment/like", c),
};

export default commentApi;
