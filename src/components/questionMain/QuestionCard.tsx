import Image from "next/image";
import { getDateDiff } from "@/global/time";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

interface QuestionCardProps {
  question: QuestionPost;
}

function QuestionCard({ question }: QuestionCardProps) {
  // 이미지가 있는지 확인 (thumbnailUrl이 있는 경우)
  const hasImage = question.thumbnailUrl && question.thumbnailUrl.trim() !== "";
  const imageUrl = question.thumbnailUrl || "";

  // 이미지가 없는 경우의 레이아웃
  if (!hasImage) {
    return (
      <div className="min-h-[120px] w-full bg-white">
        {/* 상단: 태그들과 시간 */}
        <div className="flex items-start justify-between">
          {/* 태그 영역 */}
          <div className="flex items-center gap-1">
            {/* 채택 여부에 따른 태그 렌더링 */}
            {question.chaetaekStatus ? (
              <>
                {/* 채택됨 태그 */}
                <div className="inline-flex items-center justify-center rounded bg-[#0062D2] px-1.5 py-1">
                  <span className="truncate text-SUIT_12 font-bold text-white" style={{ maxWidth: "120px" }}>
                    채택됨
                  </span>
                </div>
                {/* 과목명 태그 */}
                <div className="inline-flex items-center justify-center rounded bg-[#00E8BB] px-1.5 py-1">
                  <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
                    {question.subject || "과목 없음"}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* 과목명 태그 */}
                <div className="inline-flex items-center justify-center rounded bg-[#00E8BB] px-1.5 py-1">
                  <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
                    {question.subject || "과목 없음"}
                  </span>
                </div>
                {/* 엽전 태그 - 조건부 렌더링 */}
                {question.rewardYeopjeon && question.rewardYeopjeon > 0 && (
                  <div className="inline-flex items-center justify-center gap-1 rounded bg-[#FFB000] px-1.5 py-1">
                    <Image src="/icons/yeopjeon.svg" alt="엽전" width={12} height={12} />
                    <span className="text-SUIT_12 font-bold text-white line-clamp-1">
                      {question.rewardYeopjeon}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 시간 */}
          <div className="text-SUIT_12 font-medium text-[#C5C5C5]">{getDateDiff(question.createdDate || "")}</div>
        </div>

        {/* 8px 여백 */}
        <div className="h-2" />

        {/* 제목 */}
        <h3 className="truncate text-SUIT_14 font-medium text-black">{question.title}</h3>

        {/* 4px 여백 */}
        <div className="h-1" />

        {/* 본문 - 2줄까지 표시 */}
        <p className="line-clamp-2 text-SUIT_14 font-medium text-[#616161]">{question.content}</p>

        {/* 12px 여백 */}
        <div className="h-3" />

        {/* 하단: 좋아요와 답변 개수 */}
        <div className="flex items-center">
          {/* 좋아요 */}
          <div className="flex items-center">
            <Image src="/icons/newLikeThumb.svg" alt="좋아요" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">{question.likeCount || 0}</span>
          </div>

          {/* 답변 개수 */}
          <div className="ml-4 flex items-center">
            <Image src="/icons/newChatBubble.svg" alt="답변" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">{question.answerCount || 0}</span>
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 있는 경우의 레이아웃
  return (
    <div className="min-h-[120px] w-full bg-white">
      {/* 상단: 태그들과 시간 */}
      <div className="flex items-start justify-between">
        {/* 태그 영역 */}
        <div className="flex items-center gap-1">
          {/* 채택 여부에 따른 태그 렌더링 */}
          {question.chaetaekStatus ? (
            <>
              {/* 채택됨 태그 */}
              <div className="inline-flex items-center justify-center rounded bg-[#0062D2] px-1.5 py-1">
                <span className="truncate text-SUIT_12 font-bold text-white" style={{ maxWidth: "120px" }}>
                  채택됨
                </span>
              </div>
              {/* 과목명 태그 */}
              <div className="inline-flex items-center justify-center rounded bg-[#00E8BB] px-1.5 py-1">
                <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
                  {question.subject || "과목 없음"}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* 과목명 태그 */}
              <div className="inline-flex items-center justify-center rounded bg-[#00E8BB] px-1.5 py-1">
                <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
                  {question.subject || "과목 없음"}
                </span>
              </div>
              {/* 엽전 태그 - 조건부 렌더링 */}
              {question.rewardYeopjeon && question.rewardYeopjeon > 0 && (
                <div className="inline-flex items-center justify-center gap-1 rounded bg-[#FFB000] px-1.5 py-1">
                  <Image src="/icons/yeopjeon.svg" alt="엽전" width={12} height={12} />
                  <span className="text-SUIT_12 font-bold text-white line-clamp-1">
                    {question.rewardYeopjeon}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* 시간 */}
        <div className="text-SUIT_12 font-medium text-[#C5C5C5]">{getDateDiff(question.createdDate || "")}</div>
      </div>

      {/* 8px 여백 (이미지 있을 때) */}
      <div className="h-2" />

      {/* 메인 컨텐츠 영역 - 이미지와 텍스트 */}
      <div className="flex items-start gap-3">
        {/* 왼쪽: 텍스트 영역 - 나머지 모든 공간 차지 */}
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          <h3 className="truncate text-SUIT_14 font-medium text-black">{question.title}</h3>

          {/* 8px 여백 */}
          <div className="h-2" />

          {/* 본문 - 2줄까지 표시, 동적 너비 */}
          <p className="line-clamp-2 text-SUIT_14 font-medium text-[#616161]">{question.content}</p>
        </div>

        {/* 오른쪽: 이미지 - 고정 크기 (반응형) */}
        <div className="flex-shrink-0">
          <div className="h-[4.375rem] w-[4.375rem] overflow-hidden rounded-lg bg-[#B5B5B5]">
            <Image
              src={imageUrl}
              alt="질문 이미지"
              width={70}
              height={70}
              className="h-full w-full object-cover"
              onError={(e) => {
                // 이미지 로드 실패 시 기본 배경색 유지
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* 8px 여백 (카드 아래에서) */}
      <div className="h-2" />

      {/* 하단: 좋아요와 답변 개수 */}
      <div className="flex items-center">
        {/* 좋아요 */}
        <div className="flex items-center">
          <Image src="/icons/newLikeThumb.svg" alt="좋아요" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">{question.likeCount || 0}</span>
        </div>

        {/* 답변 개수 */}
        <div className="ml-4 flex items-center">
          <Image src="/icons/newChatBubble.svg" alt="답변" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">{question.answerCount || 0}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
