// src/types/api/response/noticePostDto.ts
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { Page } from "@/types/api/entities/interface/page";

export interface NoticePostDto {
  noticePost?: NoticePost;
  noticePostsPage?: Page<NoticePost>;
}
