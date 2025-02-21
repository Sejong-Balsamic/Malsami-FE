import { SortTypeKey } from "@/types/sortTypes";
import { ChaetaekStatusKey } from "@/types/chaetaekStatus";
import { QnaPresetTagsKey } from "@/types/qnaPresetTags";

export interface QnaFilterOptions {
  chaetaekStatus?: ChaetaekStatusKey; // `ChaetaekStatusKey | undefined`와 동일
  qnaPresetTags: QnaPresetTagsKey[];
  sortType?: SortTypeKey; // `SortTypeKey | undefined`와 동일
}
