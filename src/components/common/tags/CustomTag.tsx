import React from "react";

type CustomTagProps = {
  tagName: string;
};

function CustomTag({ tagName }: CustomTagProps) {
  // 태그명이 너무 길면 줄임표 처리 (6글자 제한)
  const displayName = tagName.length > 6 ? `${tagName.slice(0, 6)}..` : tagName;

  return (
    <span className="inline-flex h-[28px] flex-shrink-0 items-center justify-center gap-[4px] whitespace-nowrap rounded-[34px] bg-[#EDEDED] px-[12px] py-[8px] text-[12px] font-medium leading-[12px] text-[#898989]">
      {displayName}
    </span>
  );
}

export default CustomTag;
