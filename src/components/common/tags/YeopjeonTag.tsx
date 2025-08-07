import React from "react";
import IconWrapper21x21 from "../IconWrapper21x21";

function YeopjeonTag({ point }: { point: number }) {
  return (
    <span className="font-pretendard-semibold flex items-center text-[12px] text-black">
      <IconWrapper21x21 src="/icons/custom/Yeopjeon.svg" />
      <span className="ml-1">{point}</span>
    </span>
  );
}

export default YeopjeonTag;
