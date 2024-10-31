import React from "react";
import ImageWrapper from "@/components/board/tags/ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="inline-block text-black text-[12px] font-pretendard-semibold">
      <ImageWrapper src="/icons/Yeopjeon.png" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
