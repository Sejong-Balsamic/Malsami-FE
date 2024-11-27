import React from "react";
import Image from "next/image";

interface ScrollFABProps {
  targetRef: React.RefObject<HTMLDivElement>; // 부모에서 전달받는 Ref
}

function ScrollFAB({ targetRef }: ScrollFABProps) {
  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" }); // 해당 요소로 스크롤
    }
  };

  return (
    <div className="z-0">
      <button
        type="button"
        className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-300 shadow-lg"
        onClick={handleScroll} // 스크롤 이벤트 핸들러 추가
      >
        <Image src="/icons/Scroll.svg" alt="Scroll Down" width={22} height={11} />
      </button>
    </div>
  );
}

export default ScrollFAB;
