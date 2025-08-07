// src/types/api/requests/generalPostCommand.ts
import { ContentType } from "@/types/api/constants/contentType";
import { SortType } from "@/types/api/constants/sortType";

export interface GeneralPostCommand {
  memberId?: string;
  contentType?: ContentType;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
  query?: string;
}
