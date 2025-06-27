import QuestionCardSkeleton from "./QuestionCardSkeleton";

export default function QuestionCardListSkeleton() {
  return (
    <div className="w-full">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={`question-skeleton-${index}`}>
          <QuestionCardSkeleton />

          {/* 마지막 카드가 아니면 16px 간격 + 보더 + 16px 간격 */}
          {index < 2 && (
            <>
              <div className="h-4" />
              <div className="h-px w-full bg-[#F0F0F0]" />
              <div className="h-4" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
