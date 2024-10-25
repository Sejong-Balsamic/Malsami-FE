import QuestionCard from "./QuestionCard";
import questionData from "@/apis/question/getAllQuestions";

export default function QuestionCardList() {
  return (
    <div>
      {questionData.map(question => (
        <QuestionCard
          key={question.questionPostId} // 질문 ID를 키로 사용
          assignedTags={question.assignedTags}
          title={question.title}
          content={question.content}
          thumbnail={question.thumbnail}
          createdDate={question.createdDate}
          viewCount={question.viewCount}
          likeCount={question.likeCount}
          commentCount={question.commentCount}
        />
      ))}
    </div>
  );
}
