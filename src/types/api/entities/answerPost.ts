// src/types/api/entities/answerPost.ts

import { QuestionPost } from "@/types/api/entities/questionPost";
import { MediaFile } from "@/types/api/entities/mediaFile";
import { BasePost } from "@/types/api/entities/interface/basePost";
import { Member } from "./member";

export interface AnswerPost extends BasePost {
  answerPostId?: string;
  member?: Member;
  questionPost?: QuestionPost;
  content?: string;
  isChaetaek?: boolean;
  mediaFiles?: MediaFile[];
  isLiked?: boolean;
}
