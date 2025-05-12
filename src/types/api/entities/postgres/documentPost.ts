// src/types/api/entities/postgrs/documentPost.ts
import { PostTier } from "@/types/api/constants/postTier";
import { BasePost } from "@/types/api/entities/interface/basePost";
import { Member } from "@/types/api/entities/postgres/member";
import { DocumentType } from "@/types/api/constants/documentType";

export interface DocumentPost extends BasePost {
  documentPostId?: string;
  member?: Member;
  title?: string;
  customTags?: string[];
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
  customTags?: string[];
}
