// src/types/api/responses/questionDto.ts

import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { Page } from "@/types/api/entities/interface/page";
import { AnswerPost } from "@/types/api/entities/postgres/answerPost";
import { MediaFile } from "@/types/api/entities/postgres/mediaFile";
import { QuestionBoardLike } from "@/types/api/entities/mongo/questionBoardLike";

export interface QuestionDto {
  questionPost?: QuestionPost;
  questionPostsPage?: Page<QuestionPost>;
  answerPost?: AnswerPost;
  answerPosts?: AnswerPost[];
  mediaFiles?: MediaFile[];
  customTags?: string[];
  questionBoardLike?: QuestionBoardLike;
}
