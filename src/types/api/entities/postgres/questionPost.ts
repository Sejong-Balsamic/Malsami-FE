// src/types/api/entities/postgres/questionPost.ts
import { BasePost } from "@/types/api/entities/interface/basePost";
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";
import { Member } from "./member";

export interface QuestionPost extends BasePost {
  questionPostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  questionPresetTags?: QuestionPresetTag[];
  thumbnailUrl?: string;
  answerCount?: number;
  rewardYeopjeon?: number;
  chaetaekStatus?: boolean;
  dailyScore?: number;
  weeklyScore?: number;
  isLiked?: boolean;
  isPopular?: boolean;
  isAuthor?: boolean;
  customTags?: string[];
}
