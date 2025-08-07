// src/types/api/entities/postgres/searchQueryCache.ts
export interface SearchQueryCache {
  searchQueryCacheId?: string;
  queryText?: string;
  embedding?: number[];
  searchCount?: number;
}
