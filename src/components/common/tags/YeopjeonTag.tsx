import React from "react";
import Image from "next/image";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold inline-block text-[12px] text-black">
      <Image src="/icons/Yeopjeon.svg" width={14} height={14} alt="Yeopjeon" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
