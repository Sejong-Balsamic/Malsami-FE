import { Member } from "@/types/apiTypes/member";

export interface MediaFile {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  isLiked: boolean;
  mediaFileId: string;
  postId: string;
  originalFileName: string;
  uploadedFileName: string;
  thumbnailUrl: string;
  uploadedImageUrl: string;
  filePath: string;
  fileSize: number;
  contentType: string;
  mimeType: string;
}

export interface QuestionPost {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  isLiked: boolean;
  dailyScore: number;
  weeklyScore: number;
  questionPostId: string;
  member: Member;
  title: string;
  content: string;
  subject: string;
  faculties: string[];
  questionPresetTags: string[];
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  answerCount: number;
  commentCount: number;
  rewardYeopjeon: number;
  chaetaekStatus: boolean;
  isPrivate: boolean;
}

export interface QuestionPostsPage {
  totalElements: number;
  totalPages: number;
  size: number;
  content: QuestionPost[];
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

export interface AnswerPost {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  isLiked: boolean;
  answerPostId: string;
  member: Member;
  questionPost: QuestionPost;
  content: string;
  likeCount: number;
  commentCount: number;
  isChaetaek: boolean;
  isPrivate: boolean;
  mediaFiles: MediaFile[];
}

export interface QuestionBoardLike {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  questionBoardLikeId: string;
  memberId: string;
  questionBoardId: string;
  contentType: string;
}

export interface QuestionData {
  questionPost: QuestionPost;
  questionPostsPage: QuestionPostsPage;
  answerPost: AnswerPost;
  answerPosts: AnswerPost[];
  mediaFiles: MediaFile[];
  customTags: string[];
  questionBoardLike: QuestionBoardLike;
}
