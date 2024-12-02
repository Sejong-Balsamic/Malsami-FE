import QuestionCardList from "@/components/board/question/QuestionCardList";
import { QnaCard } from "@/types/QnaCard";

interface SearchQnaContainerProps {
  qnaResults: QnaCard[];
  searchValue: string;
}

function SearchQnaContainer({ qnaResults, searchValue }: SearchQnaContainerProps) {
  return (
    <div className="p-5">
      {qnaResults.length > 0 ? (
        <QuestionCardList categoryQNAs={qnaResults} />
      ) : (
        <p className="font-pretendard-medium text-center text-gray-500">
          <span className="font-pretendard-bold">{searchValue}</span> 에 대한 결과가 없습니다.
        </p>
      )}
    </div>
  );
}

export default SearchQnaContainer;
