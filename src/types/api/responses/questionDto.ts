// src/types/api/responses/questionDto.ts
import { AnswerPost } from "@/types/api/entities/question";
import { MediaFile } from "@/types/api/entities/mediaFile";
import { Page } from "@/types/api/entities/page";
import { QuestionBoardLike } from "../entities/questionBoardLike";
import { QuestionPost } from "../entities/questionPost";

export interface QuestionDto {
  questionPost?: QuestionPost; // 질문
  questionPostsPage?: Page<QuestionPost>; // 질문 페이지
  answerPost?: AnswerPost; // 답변
  answerPosts?: AnswerPost[]; // 답변 목록
  mediaFiles?: MediaFile[]; // 첨부파일 (질문, 답변)
  customTags?: string[]; // 커스텀 태그 (질문)
  questionBoardLike?: QuestionBoardLike; // 좋아요 내역
}
