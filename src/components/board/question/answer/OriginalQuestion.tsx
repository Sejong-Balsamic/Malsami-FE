import Image from "next/image";

function OriginalQuestion() {
  return (
    <div className="mb-[26px] block">
      <div className="relative flex items-center gap-[6px]">
        <span className="font-pretendard-semibold text-lg">원문 보기</span>
        <Image src="/icons/BackIcon.svg" alt="Original" width={7} height={14} className="rotate-180" />
      </div>
    </div>
  );
}

export default OriginalQuestion;
