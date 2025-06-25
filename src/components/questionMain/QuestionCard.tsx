import Image from "next/image";
import { getDateDiff } from "@/global/time";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

interface QuestionCardProps {
  question: QuestionPost;
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="h-[120px] w-full bg-white">
      {/* 상단: 과목명 태그와 시간 */}
      <div className="flex items-start justify-between">
        {/* 과목명 태그 */}
        <div className="inline-flex items-center justify-center gap-2.5 rounded bg-[#00E8BB] px-1.5 py-1">
          <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
            {question.subject || "과목 없음"}
          </span>
        </div>

        {/* 시간 */}
        <div className="text-SUIT_12 font-medium text-[#C5C5C5]">
          {getDateDiff(question.createdDate || "")}
        </div>
      </div>

      {/* 12px 여백 */}
      <div className="h-3" />

      {/* 제목 */}
      <h3 className="truncate text-SUIT_14 font-medium text-black">
        {question.title}
      </h3>

      {/* 8px 여백 */}
      <div className="h-2" />

      {/* 본문 */}
      <p className="truncate text-SUIT_14 font-medium text-[#616161]">
        {question.content}
      </p>

      {/* 12px 여백 */}
      <div className="h-3" />

      {/* 하단: 좋아요와 답변 개수 */}
      <div className="flex items-center">
        {/* 좋아요 */}
        <div className="flex items-center">
          <Image src="/icons/newLikeThumb.svg" alt="좋아요" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">
            {question.likeCount || 0}
          </span>
        </div>

        {/* 답변 개수 */}
        <div className="ml-4 flex items-center">
          <Image src="/icons/newChatBubble.svg" alt="답변" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-[#C5C5C5]">
            {question.answerCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
