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
  faculties: string[]; // 여러 학부를 지원
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
  expTier: string;
  tierStartExp: number;
  tierEndExp: number;
  progressPercent: number;
  expId: string;
}

export interface MembersPage {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Member[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
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
  totalYeopjeonMembers: number; // 총 (엽전을 가진) 사람 수 (전체 회원수)
  yeopjeonPercentile: number;
  expRank: number;
  totalExpMembers: number; // 총 (경험치를 가진) 사람 수 (전체 회원수)
  expPercentile: number;
  totalLikeCount: number;
  totalPopularPostCount: number;
  totalCommentCount: number;
  totalPostCount: number;
  questionPostCount: number;
  answerPostCount: number;
  documentPostCount: number;
  documentRequestPostCount: number;
  membersPage: MembersPage; // 멤버 페이지 정보
}
