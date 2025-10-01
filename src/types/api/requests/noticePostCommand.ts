// src/types/api/requests/noticePostCommand.ts
import { Member } from "@/types/api/entities/postgres/member";
import { SortType } from "@/types/api/constants/sortType";

export interface NoticePostCommand {
  noticePostId?: string;
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
