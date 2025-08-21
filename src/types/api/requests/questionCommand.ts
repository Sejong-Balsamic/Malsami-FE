// src/types/api/requests/questionCommand.ts
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";
import { ContentType } from "@/types/api/constants/contentType";
import { SortType } from "@/types/api/constants/sortType";
import { ChaetaekStatus } from "@/types/api/constants/chaetaekStatus";
import { LikeType } from "@/types/api/constants/likeType";

export interface QuestionCommand {
  postId?: string;
  memberId?: string;
  title?: string;
  questionPostId?: string;
  content?: string;
  subject?: string;
  attachmentFiles?: File[];
  questionPresetTags?: QuestionPresetTag[];
  customTags?: string[];
  rewardYeopjeon?: number;
  contentType?: ContentType;
  likeType?: LikeType;
  isPrivate?: boolean;
  pageNumber?: number;
  pageSize?: number;
  faculty?: string;
  query?: string;
  sortType?: SortType;
  chaetaekStatus?: ChaetaekStatus;
}
