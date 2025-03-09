// src/types/api/entities/questionPost.ts
import { Member } from "./member";

export interface QuestionPost {
  questionPostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  thumbnailUrl?: string;
  answerCount?: number;
  rewardYeopjeon?: number;
  chaetaekStatus?: boolean;
  dailyScore?: number;
  weeklyScore?: number;
  isLiked?: boolean;
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  isPrivate?: boolean;
  createdDate?: string;
  updatedDate?: string;
}
