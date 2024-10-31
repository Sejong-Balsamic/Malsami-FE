import React from "react";
import ImageWrapper from "./ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="inline-block bg-black text-white px-2 py-1 mr-[2px] rounded-[15px] text-[10px] font-pretendard-semibold">
      <ImageWrapper src="/icons/Yeopjeon.png" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
