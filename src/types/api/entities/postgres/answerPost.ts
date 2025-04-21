// src/types/api/entities/postgres/answerPost.ts

import { BasePost } from "@/types/api/entities/interface/basePost";
import { Member } from "@/types/api/entities/postgres/member";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { MediaFile } from "@/types/api/entities/postgres/mediaFile";

export interface AnswerPost extends BasePost {
  answerPostId?: string;
  member?: Member;
  questionPost?: QuestionPost;
  content?: string;
  isChaetaek?: boolean;
  mediaFiles?: MediaFile[];
  isLiked?: boolean;
}
