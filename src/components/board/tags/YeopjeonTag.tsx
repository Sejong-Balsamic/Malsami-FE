import React from "react";
import ImageWrapper from "./ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="inline-block bg-custom-orange-500 text-white px-2 py-[3px] mr-1 rounded-[33px] text-xs font-pretendard-semibold">
      <ImageWrapper src="/icons/Yeopjeon.png" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
