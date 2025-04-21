// src/types/api/entities/postgres/yeopjeon.ts
import { Member } from "./member";

export interface Yeopjeon {
  yeopjeonId?: string;
  member?: Member;
  yeopjeon?: number;
}
