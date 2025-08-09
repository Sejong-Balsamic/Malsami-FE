import { useRouter } from "next/navigation";

interface AnswerFABProps {
  postId: string;
}

function AnswerFAB({ postId }: AnswerFABProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/question/detail/${postId}/answer`);
  };

  return (
    <div className="fixed bottom-[36px] left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-[20px]">
      <button
        onClick={handleClick}
        aria-label="답변 작성"
        className="h-[48px] w-full rounded-[12px] bg-question-main text-SUIT_18 font-bold text-white"
        type="button"
      >
        답변하기
      </button>
    </div>
  );
}

export default AnswerFAB;
