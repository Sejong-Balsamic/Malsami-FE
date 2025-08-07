export interface QnaCard {
  questionPostId: string;
  title: string;
  subject: string;
  content: string;
  thumbnailUrl: string;
  questionPresetTags: string[];
  rewardYeopjeon: number;
  createdDate: string;
  likeCount: number;
  answerCount: number;
  viewCount: number;
  chaetaekStatus: boolean;
}
