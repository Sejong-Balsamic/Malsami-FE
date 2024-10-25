import React from "react";
import ImageWrapper from "./ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="inline-block bg-black text-white px-3 py-1 mr-1 rounded-[15px] text-[12px] font-pretendard-semibold">
      <ImageWrapper src="/icons/Yeopjeon.png" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
