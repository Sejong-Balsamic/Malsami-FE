export interface QuestionPost {
  questionPostId: string;
  title: string;
  subject: string;
  likeCount: number;
  commentCount: number;
  JiJeongTags: string[];
  rewardYeopjeon?: number;
}
