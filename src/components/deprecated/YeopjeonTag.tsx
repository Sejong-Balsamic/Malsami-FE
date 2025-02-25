import React from "react";
import Image from "next/image";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold mr-1 flex items-center rounded-[33px] bg-custom-orange-500 px-3 py-[3px] text-sm text-white">
      <Image src="/icons/Yeopjeon.svg" width={14} height={14} alt="Yeopjeon" />
      <span className="ml-1 leading-none">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
