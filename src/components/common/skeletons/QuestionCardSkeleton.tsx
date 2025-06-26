interface QuestionCardSkeletonProps {
  hasImage?: boolean;
}

export default function QuestionCardSkeleton({ hasImage = false }: QuestionCardSkeletonProps) {
  // 이미지가 없는 경우의 스켈레톤
  if (!hasImage) {
    return (
      <div className="w-full animate-pulse bg-white">
        {/* 상단: 태그들과 시간 */}
        <div className="flex items-start justify-between">
          {/* 왼쪽: 태그들 스켈레톤 */}
          <div className="flex items-center gap-1">
            {/* 과목명 태그 (항상 있음) */}
            <div className="h-[26px] w-16 rounded bg-gray-200" />

            {/* 추가 태그 (랜덤하게 표시) */}
            {Math.random() > 0.5 && <div className="h-[26px] w-12 rounded bg-gray-200" />}
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

  // 이미지가 있는 경우의 스켈레톤
  return (
    <div className="w-full animate-pulse bg-white">
      {/* 상단: 태그들과 시간 */}
      <div className="flex items-start justify-between">
        {/* 왼쪽: 태그들 스켈레톤 */}
        <div className="flex items-center gap-1">
          {/* 과목명 태그 (항상 있음) */}
          <div className="h-[26px] w-16 rounded bg-gray-200" />

          {/* 추가 태그 (랜덤하게 표시) */}
          {Math.random() > 0.5 && <div className="h-[26px] w-12 rounded bg-gray-200" />}
        </div>

        {/* 시간 스켈레톤 */}
        <div className="h-4 w-12 rounded bg-gray-200" />
      </div>

      {/* 16px 여백 */}
      <div className="h-4" />

      {/* 메인 컨텐츠 영역 - 이미지와 텍스트 */}
      <div className="flex items-start gap-3">
        {/* 왼쪽: 텍스트 영역 스켈레톤 - 나머지 모든 공간 차지 */}
        <div className="min-w-0 flex-1">
          {/* 제목 스켈레톤 */}
          <div className="h-4 w-3/4 rounded bg-gray-200" />

          {/* 8px 여백 */}
          <div className="h-2" />

          {/* 본문 스켈레톤 - 2줄, 동적 너비 */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
        </div>

        {/* 오른쪽: 이미지 스켈레톤 - 고정 크기 (반응형) */}
        <div className="flex-shrink-0">
          <div className="h-[4.375rem] w-[4.375rem] rounded-lg bg-gray-200" />
        </div>
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
