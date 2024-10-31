import questionData from "@/apis/question/getAllQuestions";
import QuestionCard from "./QuestionCard";

export default function QuestionCardList({ faculty }: { faculty: string }) {
  console.log(faculty); // 지워야함
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
          rewardYeopjeon={question.rewardYeopjeon}
        />
      ))}
    </div>
  );
}
