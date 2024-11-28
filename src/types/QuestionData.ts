export interface QuestionData {
  questionPost: {
    createdDate: string;
    isLiked: boolean;
    questionPostId: string;
    member: {
      uuidNickname: string;
      memberId: string;
    };
    title: string;
    content: string;
    subject: string;
    questionPresetTags: string[];
    viewCount: number;
    likeCount: number;
    answerCount: number;
    commentCount: number;
    rewardYeopjeon: number;
    chaetaekStatus: boolean;
    isPrivate: boolean;
  };
  customTags: string[];
  mediaFiles: MediaFile[];
}

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