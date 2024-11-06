export interface QuestionPost {
  questionPostId: string;
  title: string;
  subject: string;
  JiJeongTags: string[];
  rewardYeopjeon?: number;
  likeCount: number;
  commentCount: number;
}
