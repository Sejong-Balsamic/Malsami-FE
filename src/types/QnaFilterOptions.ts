// src/types/QnaFilterOptions.ts
import { ChaetaekStatusKey } from "@/types/chaetaekStatus";
import { QnaPresetTagsKey } from "@/types/qnaPresetTags";
import { QnaSortType } from "@/types/api/constants/sortType";

export interface QnaFilterOptions {
  chaetaekStatus?: ChaetaekStatusKey;
  qnaPresetTags: QnaPresetTagsKey[];
  sortType?: QnaSortType;
}
