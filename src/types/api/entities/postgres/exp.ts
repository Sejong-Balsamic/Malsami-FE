// src/types/api/entities/postgres/exp.ts
import { ExpTier } from "@/types/api/constants/expTier";
import { Member } from "@/types/api/entities/postgres/member";

export interface Exp {
  expId?: string;
  member?: Member;
  exp?: number;
  expTier?: ExpTier;
  tierStartExp?: number;
  tierEndExp?: number;
  progressPercent?: number;
}
