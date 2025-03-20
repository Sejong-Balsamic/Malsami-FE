// src/types/api/response/memberDto.ts

import { TestMember } from "@/types/api/entities/postgres/testMember";
import { Page } from "@/types/api/entities/interface/page";
import { Yeopjeon } from "@/types/api/entities/postgres/yeopjeon";
import { Exp } from "@/types/api/entities/postgres/exp";
import { Member } from "@/types/api/entities/postgres/member";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { DocumentRequestPost } from "@/types/api/entities/postgres/documentRequestPost";

export interface MemberDto {
  member?: Member;
  testMember?: TestMember;
  testMembersPage?: Page<TestMember>;
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
