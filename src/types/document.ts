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
    academicYear: string;
    enrollmentStatus: string;
    profileUrl: string;
    isNotificationEnabled: boolean;
    roles: string[];
    accountStatus: string;
    lastLoginTime: string;
  }
  
  export interface DocumentPost {
    createdDate: string;
    updatedDate: string;
    isEdited: boolean;
    isDeleted: boolean;
    isLiked: boolean;
    dailyScore: number;
    weeklyScore: number;
    documentPostId: string;
    member: Member;
    title: string;
    subject: string;
    faculties: string[];
    content: string;
    documentTypes: string[];
    postTier: string;
    thumbnailUrl: string;
    attendedYear: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    viewCount: number;
    isDepartmentPrivate: boolean;
    isPopular: boolean;
  }
  
  export interface Pageable {
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
  }
  
  export interface DocumentPostsPage {
    totalElements: number;
    totalPages: number;
    size: number;
    content: DocumentPost[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: Pageable;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
  export interface DocumentRequestPost {
    createdDate: string;
    updatedDate: string;
    isEdited: boolean;
    isDeleted: boolean;
    isLiked: boolean;
    documentRequestPostId: string;
    member: Member;
    title: string;
    content: string;
    subject: string;
    faculties: string[];
    documentTypes: string[];
    viewCount: number;
    likeCount: number;
    commentCount: number;
    private: boolean;
  }
  
  export interface DocumentRequestPostsPage {
    totalElements: number;
    totalPages: number;
    size: number;
    content: DocumentRequestPost[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: Pageable;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
  export interface DocumentBoardLike {
    createdDate: string;
    updatedDate: string;
    isEdited: boolean;
    documentBoardLikeId: string;
    memberId: string;
    documentBoardId: string;
    contentType: string;
    reactionType: string;
  }
  
  export interface DocumentFile {
    createdDate: string;
    updatedDate: string;
    isEdited: boolean;
    isDeleted: boolean;
    isLiked: boolean;
    documentFileId: string;
    documentPost: DocumentPost;
    uploader: Member;
    thumbnailUrl: string;
    filePath: string;
    originalFileName: string;
    uploadedFileName: string;
    fileSize: number;
    mimeType: string;
    downloadCount: number;
    password: string;
    isInitialPasswordSet: boolean;
  }
  
  export interface DocumentData {
    documentPost: DocumentPost;
    documentPostsPage: DocumentPostsPage;
    documentRequestPost: DocumentRequestPost;
    documentRequestPostsPage: DocumentRequestPostsPage;
    documentBoardLike: DocumentBoardLike;
    customTags: string[];
    documentFiles: DocumentFile[];
  }
  