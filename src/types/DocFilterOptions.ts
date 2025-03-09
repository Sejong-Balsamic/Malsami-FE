import { DocTypesKey } from "@/types/docTypes";
import { CommonSortType } from "@/types/api/constants/sortTypes";

export interface DocFilterOptions {
  docTypes: DocTypesKey[];
  sortType?: CommonSortType;
  faculty?: string; // FIXME: string이면 안됨. 바꾸어야 함
}
