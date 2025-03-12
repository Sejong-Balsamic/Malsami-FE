// src/types/api/entities/questionBoardLike.ts
import { ContentType } from "../constants/contentTypes";
import { BaseMongoEntity } from "./baseMongoEntity";

export interface QuestionBoardLike extends BaseMongoEntity {
  questionBoardLikeId?: string;
  memberId: string; // UUID 문자열
  questionBoardId: string; // UUID 문자열
  contentType: ContentType; // Question, Answer
}
