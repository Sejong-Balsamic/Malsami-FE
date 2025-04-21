// src/types/api/entities/postgres/subject.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";

export interface Subject extends BaseEntity {
  subjectId?: string;
  name?: string;
  dailyDocumentScore?: number;
  weeklyDocumentScore?: number;
  monthlyDocumentScore?: number;
  totalDocumentScore?: number;
  dailyQuestionScore?: number;
  weeklyQuestionScore?: number;
  monthlyQuestionScore?: number;
  totalQuestionScore?: number;
}
