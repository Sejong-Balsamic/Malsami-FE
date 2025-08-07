// src/types/api/entities/interface/page.ts
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort?: any; // 필요하면 Sort 타입도 정의할 수 있음
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  empty?: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort?: any;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
}
