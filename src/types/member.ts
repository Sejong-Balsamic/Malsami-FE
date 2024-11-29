export interface Member {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  isLiked: boolean;
  memberId: string;
  studentId: number;
  studentName: string;
  uuidNickname: string;
  major: string;
  faculty: string;
  academicYear: string;
  enrollmentStatus: string;
  profileUrl: string | null;
  isNotificationEnabled: boolean;
  roles: string[];
  accountStatus: string;
  lastLoginTime: string;
}

export interface Yeopjeon {
  member: Member;
  yeopjeon: number;
  yeopjeonId: string;
}

export interface Exp {
  member: Member;
  exp: number;
  expId: string;
}

export interface MemberDto {
  member: Member;
  major: string;
  studentIdString: string;
  studentName: string;
  academicYear: string;
  enrollmentStatus: string;
  accessToken: string;
  refreshToken: string;
  yeopjeon: Yeopjeon;
  exp: Exp;
  isFirstLogin: boolean;
  isAdmin: boolean;
  yeopjeonRank: number;
  totalYeopjeon: number;
  yeopjeonPercentile: number;
  expRank: number;
  totalExp: number;
  totalLikeCount: number;
  totalPopularPostCount: number;
  totalCommentCount: number;
  totalPostCount: number;
  questionPostCount: number;
  answerPostCount: number;
  documentPostCount: number;
  documentRequestPostCount: number;
  expPercentile: number;
}
