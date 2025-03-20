// src/types/api/requests/questionCommand.ts

export interface QuestionCommand {
  postId?: string;
  memberId?: string;
  title?: string;
  questionPostId?: string;
  content?: string;
  subject?: string;
  attachmentFiles?: File[];
  questionPresetTags?: QuestionPresetTagType[];
  customTags?: string[];
  rewardYeopjeon?: number;
  contentType?: ContentTypeType;
  isPrivate?: boolean;
  pageNumber?: number;
  pageSize?: number;
  faculty?: string;
  sortType?: SortTypeType;
  chaetaekStatus?: ChaetaekStatusType;
}
