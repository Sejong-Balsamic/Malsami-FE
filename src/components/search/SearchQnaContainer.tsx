import QuestionCardList from "@/components/questionMain/QuestionCardList";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

interface SearchQnaContainerProps {
  data: QuestionPost[];
  searchValue: string;
  subject: string;
}

function SearchQnaContainer({ data, searchValue, subject }: SearchQnaContainerProps) {
  return (
    <div className="p-5">
      {data.length > 0 ? (
        <QuestionCardList data={data} />
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
