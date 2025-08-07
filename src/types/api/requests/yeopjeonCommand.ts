// src/types/api/requests/yeopjeonCommand.ts
import { Member } from "@/types/api/entities/postgres/member";

export interface YeopjeonCommand {
  member?: Member;
  amount?: number;
  targetMemberId?: string;
}
