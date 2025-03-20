// src/types/api/entities/exp.ts
import { ExpTier } from "@/types/api/constants/expTier";
import { Member } from "./member";

export interface Exp {
  expId?: string;
  member?: Member;
  exp?: number;
  expTier?: ExpTier;
  tierStartExp?: number;
  tierEndExp?: number;
  progressPercent?: number;
}
