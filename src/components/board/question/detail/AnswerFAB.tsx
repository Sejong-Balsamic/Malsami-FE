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
      className="font-pretendard-semibold fixed bottom-5 left-1/2 h-10 w-[336px] -translate-x-1/2 transform rounded-[10px] bg-[#03b89e] text-[16px] text-white"
      type="button"
    >
      답변하기
    </button>
  );
}

export default AnswerFAB;
