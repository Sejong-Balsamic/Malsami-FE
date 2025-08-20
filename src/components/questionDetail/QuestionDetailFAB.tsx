import { useRouter } from "next/navigation";
import { useState } from "react";
import ChaetaekCheckModal from "./ChaetaekCheckModal";

interface QuestionDetailFABProps {
  postId: string;
  isAuthor: boolean;
  selectedAnswerId: string | null;
  onChaetaekComplete?: () => void;
}

function QuestionDetailFAB({ postId, isAuthor, selectedAnswerId, onChaetaekComplete }: QuestionDetailFABProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnswerClick = () => {
    router.push(`/board/question/detail/${postId}/answer`);
  };

  const handleChaetaekClick = () => {
    if (selectedAnswerId) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (onChaetaekComplete) {
      onChaetaekComplete();
    }
  };

  // 작성자가 아닌 경우: 답변하기 버튼
  if (!isAuthor) {
    return (
      <div className="fixed bottom-[20px] left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-[20px]">
        <button
          onClick={handleAnswerClick}
          aria-label="답변 작성"
          className="h-[48px] w-full rounded-[12px] bg-question-main text-SUIT_16 font-bold text-white"
          type="button"
        >
          답변하기
        </button>
      </div>
    );
  }

  // 작성자인 경우
  return (
    <>
      <div className="fixed bottom-[20px] left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-[20px]">
        <button
          type="button"
          disabled={!selectedAnswerId}
          onClick={handleChaetaekClick}
          className={`h-[48px] w-full rounded-[12px] text-SUIT_16 font-bold text-white transition-colors ${
            selectedAnswerId ? "cursor-pointer bg-question-main" : "cursor-not-allowed bg-ui-disabled"
          }`}
        >
          {selectedAnswerId ? "채택하기" : "채택할 답변을 선택하세요"}
        </button>
      </div>

      {/* 채택 확인 모달 */}
      {selectedAnswerId && (
        <ChaetaekCheckModal
          isOpen={isModalOpen}
          author="" // AnswerSection에서 관리하므로 빈 값
          onClose={closeModal}
          answerPostId={selectedAnswerId}
        />
      )}
    </>
  );
}

QuestionDetailFAB.defaultProps = {
  onChaetaekComplete: undefined,
};

export default QuestionDetailFAB;
