// src/types/api/requests/questionCommand.ts
import { ContentType } from "@/types/api/constants/contentTypes";
import { CommonSortType } from "@/types/api/constants/sortTypes";
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";
import { PopularType } from "@/types/api/constants/popularType";

export interface QuestionCommand {
  // 질문 게시글 관련
  questionPostId?: string;
  memberId?: string;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  questionPresetTags?: QuestionPresetTag[];
  thumbnailUrl?: string;
  rewardYeopjeon?: number;
  customTags?: string[];
  attachmentFiles?: File[]

  // 답변 관련
  answerPostId?: string;

  // 좋아요 관련
  questionBoardLikeId?: string;
  contentType?: ContentType;

  // 페이징 및 정렬
  pageNumber?: number; // default: 0
  pageSize?: number; // default: 30
  sortType?: CommonSortType;
  sortField?: string;
  sortDirection?: "asc" | "desc";

  // 필터링
  searchTerm?: string;
  isUnanswered?: boolean;
  isLiked?: boolean;
  chaetaekStatus?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPrivate?: boolean;

  // 인기글 조회
  popularType?: PopularType;
}
