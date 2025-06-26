import QuestionCardSkeleton from "./QuestionCardSkeleton";

interface QuestionCardListSkeletonProps {
  count?: number;
}

// eslint-disable-next-line react/require-default-props
export default function QuestionCardListSkeleton({ count = 5 }: QuestionCardListSkeletonProps) {
  return (
    <div className="w-full">
      {Array.from({ length: count }, (_, index) => (
        <div key={`question-skeleton-${index}`}>
          <QuestionCardSkeleton hasImage={index % 3 === 0} />

          {/* 마지막 카드가 아니면 16px 간격 + 보더 + 16px 간격 */}
          {index < count - 1 && (
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
