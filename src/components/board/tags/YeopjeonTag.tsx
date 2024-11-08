import React from "react";
import ImageWrapper from "./ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold mr-1 inline-block rounded-[33px] bg-custom-orange-500 px-2 py-[3px] text-xs text-white">
      <ImageWrapper src="/icons/Yeopjeon.svg" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
