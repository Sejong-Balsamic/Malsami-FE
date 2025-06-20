import React from "react";

type CustomTagProps = {
  tagName: string;
};

function CustomTag({ tagName }: CustomTagProps) {
  // 태그명이 너무 길면 줄임표 처리 (6글자 제한)
  const displayName = tagName.length > 6 ? `${tagName.slice(0, 6)}..` : tagName;

  return (
    <span className="inline-block max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[14px] bg-[#DEFFD8] px-2.5 py-[2px] text-SUIT_12 font-semibold leading-[20px] text-[#00D342]">
      {displayName}
    </span>
  );
}

export default CustomTag;
