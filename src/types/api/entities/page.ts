// src/types/api/utils/pageUtils.ts
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
}

export function createEmptyPage<T>(): Page<T> {
  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    empty: true,
    first: true,
    last: true,
  };
}
