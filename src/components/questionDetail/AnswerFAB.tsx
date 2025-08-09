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
    <button
      onClick={handleClick}
      aria-label="답변 작성"
      className="fixed bottom-9 left-1/2 z-50 h-14 w-[353px] -translate-x-1/2 transform rounded-xl bg-question-main text-SUIT_18 font-bold text-white"
      type="button"
    >
      답변하기
    </button>
  );
}

export default AnswerFAB;
