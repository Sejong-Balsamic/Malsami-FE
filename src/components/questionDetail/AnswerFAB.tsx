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
      className="fixed bottom-[36px] left-1/2 z-50 h-[56px] w-[353px] -translate-x-1/2 transform rounded-[12px] bg-[#00E271] text-SUIT_18 font-bold text-white"
      type="button"
    >
      답변하기
    </button>
  );
}

export default AnswerFAB;
