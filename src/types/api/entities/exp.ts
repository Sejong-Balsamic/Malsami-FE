// src/types/api/entities/exp.ts
import { ExpTierType } from "@/types/api/constants/expTier";
import { Member } from "./member";

export interface Exp {
  expId?: string;
  member?: Member;
  exp?: number;
  expTier?: ExpTierType;
  tierStartExp?: number;
  tierEndExp?: number;
  progressPercent?: number;
}
