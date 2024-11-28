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
}
