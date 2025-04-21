import { DocTypesKey } from "@/types/docTypes";
import { SortType } from "@/types/api/constants/sortType";

export interface DocFilterOptions {
  docTypes: DocTypesKey[];
  sortType?: SortType;
  faculty?: string; // FIXME: string이면 안됨. 바꾸어야 함
}
