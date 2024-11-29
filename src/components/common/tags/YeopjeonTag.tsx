import React from "react";
import ImageWrapper from "@/components/board/tags/ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold inline-block text-[12px] text-black">
      <ImageWrapper src="/icons/Yeopjeon.svg" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
