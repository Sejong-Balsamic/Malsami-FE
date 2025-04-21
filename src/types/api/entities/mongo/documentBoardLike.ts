// src/types/api/entities/mongo/documentBoardLike.ts
import { BaseMongoEntity } from "@/types/api/entities/interface/baseMongoEntity";
import { ContentType } from "@/types/api/constants/contentType";
import { LikeType } from "@/types/api/constants/likeType";

export interface DocumentBoardLike extends BaseMongoEntity {
  documentBoardLikeId?: string;
  memberId?: string;
  documentBoardId?: string;
  contentType?: ContentType;
  likeType?: LikeType;
}
