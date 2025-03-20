//  src/types/api/responses/commentDto.ts
import { Page } from "@/types/api/entities/interface/page";
import { CommentLike } from "@/types/api/entities/mongo/commentLike";

export interface CommentDto {
  comment?: Comment;
  commentsPage?: Page<Comment>;
  commentLike?: CommentLike;
}
