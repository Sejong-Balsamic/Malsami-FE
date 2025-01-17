import { SortTypeKey } from "@/lib/constants/sortTypes";
import { ChaetaekStatusKey } from "@/lib/constants/chaetaekStatus";
import { QnaPresetTagsKey } from "@/lib/constants/qnaPresetTags";

export interface QnaFilterOptions {
  chaetaekStatus?: ChaetaekStatusKey; // `ChaetaekStatusKey | undefined`와 동일
  qnaPresetTags: QnaPresetTagsKey[];
  sortType?: SortTypeKey; // `SortTypeKey | undefined`와 동일
}
