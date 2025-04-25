import { useRouter } from "next/navigation";
import QuestionCard from "./QuestionCard";
import { QuestionPost } from "../../types/api/entities/postgres/questionPost";

interface QuestionCardListProps {
  data: QuestionPost[];
}

export default function QuestionCardList({ data }: QuestionCardListProps) {
  const router = useRouter();

  return (
    <div>
      {data.map(questionPost => (
        <div
          key={questionPost.questionPostId}
          role="button"
          tabIndex={0} // 키보드 탐색이 가능하도록 tabindex 추가
          onClick={() => router.push(`/board/question/detail/${questionPost.questionPostId}`)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              router.push(`/board/question/detail/${questionPost.questionPostId}`);
            }
          }} // 키보드 이벤트 추가
          className="cursor-pointer"
        >
          <QuestionCard
            title={questionPost.title as string}
            content={questionPost.content as string}
            thumbnail={questionPost.thumbnailUrl as string}
            createdDate={questionPost.createdDate as string}
            viewCount={questionPost.viewCount as number}
            likeCount={questionPost.likeCount as number}
            rewardYeopjeon={questionPost.rewardYeopjeon as number}
            chaetaekStatus={questionPost.chaetaekStatus as boolean}
            subject={questionPost.subject as string}
          />
        </div>
      ))}
    </div>
  );
}
