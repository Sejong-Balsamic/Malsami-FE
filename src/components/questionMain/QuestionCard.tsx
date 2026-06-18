import Image from "next/image";
import { getDateDiff } from "@/global/time";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";

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
      <div className="flex h-full min-h-[120px] w-full flex-col bg-white">
        {/* 상단: 태그들과 시간 */}
        <div className="flex items-start justify-between">
          {/* 태그 영역 */}
          <div className="flex items-center gap-1">
            {/* 채택 여부에 따른 태그 렌더링 */}
            {question.chaetaekStatus ? (
              <>
                {/* 채택 태그 */}
                <ChaetaekTag />
                {/* 과목명 태그 */}
                <SubjectTag subjectName={question.subject} type="question" />
              </>
            ) : (
              <>
                {/* 과목명 태그 */}
                <SubjectTag subjectName={question.subject} type="question" />
                {/* 엽전 태그 */}
                <RewardTag amount={question.rewardYeopjeon || 0} />
              </>
            )}
          </div>

          {/* 시간 */}
          <div className="text-SUIT_12 font-medium text-ui-muted">{getDateDiff(question.createdDate || "")}</div>
        </div>

        {/* 8px 여백 */}
        <div className="h-2" />

        {/* 제목 */}
        <h3 className="truncate text-SUIT_14 font-medium text-black">{question.title}</h3>

        {/* 4px 여백 */}
        <div className="h-1" />

        {/* 본문 - 2줄까지 표시 */}
        <p className="line-clamp-2 text-SUIT_14 font-medium text-ui-body">{question.content}</p>

        {/* 12px 여백 — PC 그리드에서 남은 공간 채워 하단 정보 바닥 정렬 */}
        <div className="h-3 lg:flex-1" />

        {/* 하단: 좋아요와 답변 개수 */}
        <div className="mt-auto flex items-center">
          {/* 좋아요 */}
          <div className="flex items-center">
            <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{question.likeCount || 0}</span>
          </div>

          {/* 답변 개수 */}
          <div className="ml-4 flex items-center">
            <Image src="/icons/newChatBubbleGray.svg" alt="답변" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{question.answerCount || 0}</span>
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 있는 경우의 레이아웃
  return (
    <div className="flex h-full min-h-[120px] w-full flex-col bg-white">
      {/* 상단: 태그들과 시간 */}
      <div className="flex items-start justify-between">
        {/* 태그 영역 */}
        <div className="flex items-center gap-1">
          {/* 채택 여부에 따른 태그 렌더링 */}
          {question.chaetaekStatus ? (
            <>
              {/* 채택 태그 */}
              <ChaetaekTag />
              {/* 과목명 태그 */}
              <SubjectTag subjectName={question.subject} type="question" />
            </>
          ) : (
            <>
              {/* 과목명 태그 */}
              <SubjectTag subjectName={question.subject} type="question" />
              {/* 엽전 태그 */}
              <RewardTag amount={question.rewardYeopjeon || 0} />
            </>
          )}
        </div>

        {/* 시간 */}
        <div className="text-SUIT_12 font-medium text-ui-muted">{getDateDiff(question.createdDate || "")}</div>
      </div>

      {/* 8px 여백 (이미지 있을 때) */}
      <div className="h-2" />

      {/* 메인 컨텐츠 영역 - 이미지와 텍스트 */}
      <div className="flex items-start gap-3">
        {/* 왼쪽: 텍스트 영역 - 나머지 모든 공간 차지 */}
        <div className="min-w-0 flex-1">
          {/* 제목 */}
          <h3 className="truncate text-SUIT_14 font-medium text-black">{question.title}</h3>

          {/* 8px 여백 */}
          <div className="h-2" />

          {/* 본문 - 2줄까지 표시, 동적 너비 */}
          <p className="line-clamp-2 text-SUIT_14 font-medium text-ui-body">{question.content}</p>
        </div>

        {/* 오른쪽: 이미지 - 모바일 70px, PC 90px */}
        <div className="flex-shrink-0">
          <div className="h-[4.375rem] w-[4.375rem] overflow-hidden rounded-lg bg-ui-image-bg lg:h-[5.625rem] lg:w-[5.625rem]">
            <Image
              src={imageUrl}
              alt="질문 이미지"
              width={90}
              height={90}
              className="h-full w-full object-cover"
              onError={e => {
                // 이미지 로드 실패 시 기본 배경색 유지
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* 8px 여백 (카드 아래에서) — PC 그리드에서 남은 공간 채워 하단 정보 바닥 정렬 */}
      <div className="h-2 lg:flex-1" />

      {/* 하단: 좋아요와 답변 개수 */}
      <div className="mt-auto flex items-center">
        {/* 좋아요 */}
        <div className="flex items-center">
          <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{question.likeCount || 0}</span>
        </div>

        {/* 답변 개수 */}
        <div className="ml-4 flex items-center">
          <Image src="/icons/newChatBubbleGray.svg" alt="답변" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{question.answerCount || 0}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
