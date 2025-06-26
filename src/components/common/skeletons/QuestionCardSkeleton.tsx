export default function QuestionCardSkeleton() {
  return (
    <div className="w-full animate-pulse bg-white">
      {/* 상단: 태그들과 시간 */}
      <div className="flex items-start justify-between">
        {/* 왼쪽: 태그들 스켈레톤 */}
        <div className="flex items-center gap-1">
          {/* 과목명 태그 (항상 있음) */}
          <div className="h-[26px] w-16 rounded bg-gray-200" />
          {/* 추가 태그 */}
          <div className="h-[26px] w-12 rounded bg-gray-200" />
        </div>

        {/* 시간 스켈레톤 */}
        <div className="h-4 w-12 rounded bg-gray-200" />
      </div>

      {/* 12px 여백 */}
      <div className="h-3" />

      {/* 제목 스켈레톤 */}
      <div className="h-4 w-3/4 rounded bg-gray-200" />

      {/* 8px 여백 */}
      <div className="h-2" />

      {/* 본문 스켈레톤 - 2줄 */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>

      {/* 12px 여백 */}
      <div className="h-3" />

      {/* 하단: 좋아요와 답변 개수 스켈레톤 */}
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="h-[14px] w-[14px] rounded bg-gray-200" />
          <div className="ml-1 h-3 w-4 rounded bg-gray-200" />
        </div>

        <div className="ml-4 flex items-center">
          <div className="h-[14px] w-[14px] rounded bg-gray-200" />
          <div className="ml-1 h-3 w-4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
