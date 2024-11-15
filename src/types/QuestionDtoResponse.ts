export interface QuestionDtoResponse {
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
    isPrivate: boolean;
  };
}
