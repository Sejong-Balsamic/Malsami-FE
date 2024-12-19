import Image from "next/image";

export default function AutoCompleteSuggestionList({
  filteredTerms,
  activeSuggestionIndex,
  onSuggestionClick,
}: {
  filteredTerms: string[];
  activeSuggestionIndex: number;
  onSuggestionClick: (term: string) => void;
}) {
  return (
    <div className="absolute top-full z-10 mt-0.5 w-full rounded-b-[20px] bg-white px-1 pb-3 pt-3">
      <h5 className="mb-5 px-6 text-xs">교과목명 추천검색어</h5>
      {filteredTerms.map((term, index) => (
        <div
          key={term}
          role="presentation"
          onClick={() => onSuggestionClick(term)}
          className={`font-pretendard-medium flex cursor-pointer justify-between px-6 py-2 text-base ${
            index === activeSuggestionIndex ? "rounded-2xl bg-gray-100" : ""
          }`}
        >
          <span>{term}</span>
          <Image src="/icons/AutoCompleteIcon.svg" alt="자동완성" width={14} height={14} />
        </div>
      ))}
    </div>
  );
}
