import React from "react";

type CustomTagProps = {
  tagName: string;
};

function CustomTag({ tagName }: CustomTagProps) {
  // 태그명이 너무 길면 줄임표 처리 (8글자 제한)
  const displayName = tagName.length > 8 ? `${tagName.slice(0, 8)}..` : tagName;

  return (
    <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-[#F0F0F0] px-3 py-1 text-SUIT_12 font-medium leading-[18px] text-[#777777]">
      {displayName}
    </span>
  );
}

export default CustomTag;
