// src/types/api/response/memberDto.ts
import { Member } from "../entities/member";
import { Yeopjeon } from "../entities/yeopjeon";
import { Exp } from "../entities/exp";
import { QuestionPost } from "../entities/questionPost";
import { DocumentPost } from "../entities/documentPost";
import { DocumentRequestPost } from "../entities/documentRequestPost";

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface MemberDto {
  member?: Member;
  major?: string;
  studentIdString?: string;
  studentName?: string;
  academicYear?: string;
  enrollmentStatus?: string;
  accessToken?: string;
  refreshToken?: string;
  yeopjeon?: Yeopjeon;
  exp?: Exp;
  isFirstLogin?: boolean;
  isAdmin?: boolean;
  yeopjeonRank?: number;
  totalYeopjeonMembers?: number;
  yeopjeonPercentile?: number;
  canAccessCheonmin?: boolean;
  canAccessJungin?: boolean;
  canAccessYangban?: boolean;
  canAccessKing?: boolean;
  cheonminRequirement?: number;
  junginRequirement?: number;
  yangbanRequirement?: number;
  kingRequirement?: number;
  expRank?: number;
  totalExpMembers?: number;
  expPercentile?: number;
  totalLikeCount?: number;
  totalPopularPostCount?: number;
  totalCommentCount?: number;
  totalPostCount?: number;
  questionPostCount?: number;
  answerPostCount?: number;
  documentPostCount?: number;
  documentRequestPostCount?: number;
  membersPage?: Page<Member>;
  questionPostsPage?: Page<QuestionPost>;
  documentPostsPage?: Page<DocumentPost>;
  documentRequestPostsPage?: Page<DocumentRequestPost>;
}
