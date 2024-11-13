// import { useState, useEffect } from "react";
// import getCategoryQNAs from "@/apis/question/getCategoryQNAs";
import QuestionCard from "./QuestionCard";

// interface Question {
//   questionPostId: string;
//   questionPresetTags: string[];
//   title: string;
//   content: string;
//   thumbnail: string;
//   createdDate: string;
//   viewCount: number;
//   likeCount: number;
//   commentCount: number;
//   rewardYeopjeon: number;
// }

interface QnaCardListProps {
  categoryQNAs: {
    questionPostId: string;
    title: string;
    subject: string;
    content: string;
    thumbnail: string;
    questionPresetTags: string[];
    rewardYeopjeon: number;
    createdDate: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
  }[];
}

export default function QuestionCardList({ categoryQNAs }: QnaCardListProps) {
  return (
    <div>
      {categoryQNAs.map(question => (
        <QuestionCard
          key={question.questionPostId} // 질문 ID를 키로 사용
          JiJeongTags={question.questionPresetTags}
          title={question.title}
          content={question.content}
          thumbnail={question.thumbnail}
          createdDate={question.createdDate}
          viewCount={question.viewCount}
          likeCount={question.likeCount}
          commentCount={question.commentCount}
          rewardYeopjeon={question.rewardYeopjeon}
        />
      ))}
    </div>
  );
}
