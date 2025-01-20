import { SortTypeKey } from "@/lib/constants/sortTypes";
import { DocTypesKey } from "@/lib/constants/docTypes";

export interface DocFilterOptions {
  docTypes: DocTypesKey[];
  sortType?: SortTypeKey; // `SortTypeKey | undefined`와 동일
  faculty?: string; // string이면 안됨. 바꾸어야 함
}
