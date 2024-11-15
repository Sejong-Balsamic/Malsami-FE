import { useRouter } from "next/navigation";
import QuestionCard from "./QuestionCard";

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
    isChaetaek: boolean;
  }[];
}

export default function QuestionCardList({ categoryQNAs }: QnaCardListProps) {
  const router = useRouter();

  return (
    <div>
      {categoryQNAs.map(question => (
        <div
          key={question.questionPostId}
          role="button" // 접근성을 위해 role="button" 추가
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
            thumbnail={question.thumbnail}
            createdDate={question.createdDate}
            viewCount={question.viewCount}
            likeCount={question.likeCount}
            commentCount={question.commentCount}
            rewardYeopjeon={question.rewardYeopjeon}
            isChaetaek={question.isChaetaek}
          />
        </div>
      ))}
    </div>
  );
}
