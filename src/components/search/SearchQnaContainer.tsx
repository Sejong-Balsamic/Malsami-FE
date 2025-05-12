import { useRouter } from "next/navigation";
import QuestionCard from "@/components/questionMain/QuestionCard";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

interface SearchQnaContainerProps {
  data: QuestionPost[];
  searchValue: string;
  subject: string;
}

function SearchQnaContainer({ data, searchValue, subject }: SearchQnaContainerProps) {
  const router = useRouter();

  return (
    <div className="p-5">
      {data.length > 0 ? (
        <div>
          {data.map(questionPost => (
            <div
              key={questionPost.questionPostId}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/board/question/detail/${questionPost.questionPostId}`)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/board/question/detail/${questionPost.questionPostId}`);
                }
              }}
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
      ) : (
        <p className="font-pretendard-medium text-center text-gray-500">
          <span className="font-pretendard-bold">{subject} </span>
          <span className="font-pretendard-bold">{searchValue}</span> 에 대한 결과가 없습니다.{" "}
        </p>
      )}
    </div>
  );
}

export default SearchQnaContainer;
