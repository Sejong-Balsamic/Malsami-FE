//  src/types/api/responses/commentDto.ts
import { Page } from "@/types/api/entities/interface/page";
import { CommentLike } from "@/types/api/entities/mongo/commentLike";
import { Comment } from "@/types/api/entities/postgres/comment";

export interface CommentDto {
  comment?: Comment;
  commentsPage?: Page<Comment>;
  commentLike?: CommentLike;
}
