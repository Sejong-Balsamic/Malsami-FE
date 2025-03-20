// src/types/api/entities/postgres/documentRequestPost.ts
import { DocumentType } from "@/types/api/constants/documentType";
import { BasePost } from "@/types/api/entities/interface/basePost";
import { Member } from "@/types/api/entities/member";

export interface DocumentRequestPost extends BasePost {
  documentRequestPostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  documentTypes?: DocumentType[];
  isLiked?: boolean;
}
