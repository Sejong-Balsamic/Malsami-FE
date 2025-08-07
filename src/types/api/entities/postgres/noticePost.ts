// src/types/api/entities/noticePost.ts
import { BasePost } from "@/types/api/entities/interface/basePost";
import { Member } from "@/types/api/entities/postgres/member";

export interface NoticePost extends BasePost {
  noticePostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  isHidden?: boolean;
  isLiked?: boolean;
}
