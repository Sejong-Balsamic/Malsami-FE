export default function DocumentBoardNavigateCardSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-2">
      {/* 원형 이미지 스켈레톤 */}
      <div className="h-[66px] w-[66px] animate-pulse rounded-full bg-gray-200" />

      {/* 텍스트 스켈레톤 */}
      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
