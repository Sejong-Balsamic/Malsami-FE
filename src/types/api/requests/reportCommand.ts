// src/types/api/requests/reportCommand.ts
import { Member } from "@/types/api/entities/postgres/member";
import { ContentType } from "@/types/api/constants/contentType";
import { ReportReason } from "@/types/api/constants/reportReason";

export interface ReportCommand {
  member?: Member;
  reportedEntityId?: string;
  contentType?: ContentType;
  reportReason?: ReportReason;
  pageNumber?: number;
  pageSize?: number;
}
