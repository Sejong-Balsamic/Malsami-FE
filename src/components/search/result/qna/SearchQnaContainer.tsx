import QuestionCardList from "@/components/board/question/QuestionCardList";
import { QnaCard } from "@/types/QnaCard";

interface SearchQnaContainerProps {
  qnaResults: QnaCard[];
}

function SearchQnaContainer({ qnaResults }: SearchQnaContainerProps) {
  return (
    <div className="p-5">
      {qnaResults.length > 0 ? (
        <QuestionCardList categoryQNAs={qnaResults} />
      ) : (
        <p className="text-center text-gray-500">결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchQnaContainer;
