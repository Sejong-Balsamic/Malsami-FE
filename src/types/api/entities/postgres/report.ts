// src/types/api/entities/mongo/report.ts
import { BaseMongoEntity } from "@/types/api/entities/interface/baseMongoEntity";
import { ContentType } from "@/types/api/constants/contentType";
import { ReportReason } from "@/types/api/constants/reportReason";

export interface Report extends BaseMongoEntity {
  reportId?: string;
  reporterId?: string;
  reportedMemberId?: string;
  reportedEntityId?: string;
  contentType?: ContentType;
  reportReason?: ReportReason;
  message?: string;
}
