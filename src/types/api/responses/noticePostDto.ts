// src/types/api/response/noticePostDto.ts
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { Page } from "@/types/api/entities/interface/page";

export interface NoticePostDto {
  noticePost?: NoticePost;
  noticePosts?: NoticePost[]; // PIN된 공지사항 리스트
  noticePostsPage?: Page<NoticePost>;
}
