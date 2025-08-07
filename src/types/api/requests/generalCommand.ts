// src/types/api/requests/generalCommand.ts

import { ContentType } from "@/types/api/constants/contentType";
import { SortType } from "@/types/api/constants/sortType";

export interface GeneralCommand {
  memberId?: string;
  contentType?: ContentType;
  query?: string;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
}
