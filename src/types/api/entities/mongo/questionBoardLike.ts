// src/types/api/entities/mongo/questionBoardLike.ts

import { ContentType } from "@/types/api/constants/contentType";
import { BaseMongoEntity } from "@/types/api/entities/interface/baseMongoEntity";

export interface QuestionBoardLike extends BaseMongoEntity {
  questionBoardLikeId?: string;
  memberId: string; // UUID 문자열
  questionBoardId: string; // UUID 문자열
  contentType: ContentType; // Question, Answer
}
