// src/types/api/requests/noticePostCommand.ts
import { Member } from "@/types/api/entities/postgres/member";
import { SortType } from "@/types/api/constants/sortType";

export interface NoticePostCommand {
  noticePostId?: string;
  postId?: string; // 백엔드 좋아요 API에서 사용
  member?: Member;
  title?: string;
  content?: string;
  query?: string;
  sortType?: SortType;
  sortField?: string;
  sortDirection?: string;
  pageNumber?: number;
  pageSize?: number;
}
