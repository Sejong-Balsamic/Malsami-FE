// src/types/api/requests/documentCommand.ts
import { Member } from "@/types/api/entities/postgres/member";
import { ContentType } from "@/types/api/constants/contentType";
import { LikeType } from "@/types/api/constants/likeType";
import { SortType } from "@/types/api/constants/sortType";
import { PostTier } from "@/types/api/constants/postTier";

export interface DocumentCommand {
  memberId?: string;
  title?: string;
  content?: string;
  subject?: string;
  faculty?: string;
  documentTypes?: DocumentType[];
  attachmentFiles?: File[];
  attendedYear?: number;
  isDepartmentPrivate?: boolean;
  isPrivate?: boolean;
  customTags?: string[];
  documentPostId?: string;
  member?: Member;
  pageNumber?: number;
  pageSize?: number;
  contentType?: ContentType;
  likeType?: LikeType;
  sortType?: SortType;
  postTier?: PostTier;
  filePath?: string;
  documentFileId?: string;
}
