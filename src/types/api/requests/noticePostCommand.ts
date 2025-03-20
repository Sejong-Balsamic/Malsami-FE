// src/types/api/requests/noticePostCommand.ts
import { Member } from "@/types/api/entities/postgres/member";
import { SortType } from "@/types/api/constants/sortType";

export interface NoticePostCommand {
  member?: Member;
  title?: string;
  content?: string;
  isHidden?: boolean;
  query?: string;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
}
