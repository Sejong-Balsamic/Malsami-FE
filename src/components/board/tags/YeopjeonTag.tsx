import React from "react";
import ImageWrapper from "./ImageWrapper";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold mr-1 flex items-center rounded-[33px] bg-custom-orange-500 px-3 py-[3px] text-sm text-white">
      <ImageWrapper src="/icons/Yeopjeon.svg" />
      <span className="ml-1 leading-none">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
