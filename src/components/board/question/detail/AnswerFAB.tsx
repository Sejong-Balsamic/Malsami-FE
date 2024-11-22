import { useRouter } from "next/navigation";
import Image from "next/image";

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
      className="fixed bottom-5 right-5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#03B89E] shadow-lg"
      type="button"
    >
      <Image src="/icons/Yeopjeon.svg" alt="답변 작성" width={30} height={30} />
    </button>
  );
}

export default AnswerFAB;
