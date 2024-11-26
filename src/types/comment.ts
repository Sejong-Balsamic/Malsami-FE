export interface Member {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  memberId: string;
  studentId: number;
  studentName: string;
  uuidNickname: string;
  major: string;
  academicYear: string;
  enrollmentStatus: string;
  profileUrl: string | null;
  isNotificationEnabled: boolean;
  roles: string[];
  accountStatus: string;
  lastLoginTime: string;
}

export interface Comment {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  isLiked: boolean;
  commentId: string;
  member: Member;
  postId: string;
  content: string;
  likeCount: number;
  contentType: string;
  isPrivate: boolean;
}

export interface CommentsPage {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Comment[]; // Array of comments
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
