// src/types/api/entities/documentPost.ts
import { PostTier } from "@/types/api/constants/postTiers";
import { Member } from "./member";

export interface DocumentPost {
  documentPostId?: string;
  member?: Member;
  title?: string;
  subject?: string;
  content?: string;
  faculties?: string[];
  documentTypes?: DocumentType[];
  postTier?: PostTier;
  thumbnailUrl?: string;
  attendedYear?: number;
  dislikeCount?: number;
  isDepartmentPrivate?: boolean;
  isPopular?: boolean;
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
