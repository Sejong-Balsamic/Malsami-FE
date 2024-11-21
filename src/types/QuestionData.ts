export interface QuestionData {
  questionPost: {
    createdDate: string;
    questionPostId: string;
    member: {
      uuidNickname: string;
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
  answerPosts: {
    member: {
      uuidNickname: string;
      major: string;
    };
    content: string;
    likeCount: number;
    commentCount: number;
    isChaetaek: boolean;
    isPrivate: boolean;
  }[];
  isLiked: boolean;
  customTags: string[];
}
