// src/types/api/entities/mongo/commentLike.ts
import { BaseMongoEntity } from "@/types/api/entities/interface/baseMongoEntity";
import { ContentType } from "@/types/api/constants/contentType";

export interface CommentLike extends BaseMongoEntity {
  commentLikeId?: string;
  commentId?: string;
  memberId?: string;
  contentType?: ContentType;
}
