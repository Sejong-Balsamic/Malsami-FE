// src/types/api/responses/queryDto.ts
import { Page } from "@/types/api/entities/interface/page";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { DocumentRequestPost } from "@/types/api/entities/postgres/documentRequestPost";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";

export interface QueryDto {
  questionPostsPage?: Page<QuestionPost>;
  documentPostsPage?: Page<DocumentPost>;
  documentRequestPostsPage?: Page<DocumentRequestPost>;
  noticePostsPage?: Page<NoticePost>;
}
