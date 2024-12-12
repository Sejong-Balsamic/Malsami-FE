import React from "react";
import Image from "next/image";

interface ScrollFABProps {
  targetRef: React.RefObject<HTMLDivElement>;
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
        className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#E1E1E1] bg-white shadow-lg"
        onClick={handleScroll}
      >
        <Image src="/icons/Scroll.svg" alt="Scroll Down" width={22} height={11} />
      </button>
    </div>
  );
}

export default ScrollFAB;
