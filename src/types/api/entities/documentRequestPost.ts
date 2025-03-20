// src/types/api/entities/documentRequestPost.ts
import { DocumentType } from "@/types/api/constants/documentType";
import { Member } from "./member";

export interface DocumentRequestPost {
  documentRequestPostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  documentTypes?: DocumentType[];
  isLiked?: boolean;
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  isPrivate?: boolean;
  createdDate?: string;
  updatedDate?: string;
}
