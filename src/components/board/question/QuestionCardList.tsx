import { useState, useEffect } from "react";
import getCategoryQNAs from "@/apis/question/getCategoryQNAs";
import QuestionCard from "./QuestionCard";

interface Question {
  questionPostId: string;
  questionPresetTags: string[];
  title: string;
  content: string;
  thumbnail: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  rewardYeopjeon: number;
}

export default function QuestionCardList() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryQNAs();
        setQuestions(data);
      } catch (error) {
        console.error("질문 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []); // 빈 의존성 배열로 초기 렌더링 시 한 번만 실행

  return (
    <div>
      {questions.map(question => (
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
