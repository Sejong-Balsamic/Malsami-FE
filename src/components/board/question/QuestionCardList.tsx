import { useRouter } from "next/navigation";
import { QnaCard } from "@/types/QnaCard";
import QuestionCard from "./QuestionCard";

interface QnaCardListProps {
  categoryQNAs: QnaCard[];
}

export default function QuestionCardList({ categoryQNAs }: QnaCardListProps) {
  const router = useRouter();

  return (
    <div>
      {categoryQNAs.map(question => (
        <div
          key={question.questionPostId}
          role="button"
          tabIndex={0} // 키보드 탐색이 가능하도록 tabindex 추가
          onClick={() => router.push(`/board/question/detail/${question.questionPostId}`)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              router.push(`/board/question/detail/${question.questionPostId}`);
            }
          }} // 키보드 이벤트 추가
          className="cursor-pointer"
        >
          <QuestionCard
            JiJeongTags={question.questionPresetTags}
            title={question.title}
            content={question.content}
            thumbnail={question.thumbnailUrl}
            createdDate={question.createdDate}
            viewCount={question.viewCount}
            likeCount={question.likeCount}
            answerCount={question.answerCount}
            rewardYeopjeon={question.rewardYeopjeon}
            chaetaekStatus={question.chaetaekStatus}
          />
        </div>
      ))}
    </div>
  );
}
