import React from "react";

type CustomTagProps = {
  tagName: string;
  type?: "document" | "question";
};

function CustomTag({ tagName, type = "question" }: CustomTagProps) {
  // 태그명이 너무 길면 줄임표 처리 (6글자 제한)
  const displayName = tagName.length > 6 ? `${tagName.slice(0, 6)}..` : tagName;

  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        rounded-[34px]
        bg-[#EDEDED]
        text-[#898989]
        text-[12px]
        font-medium
        leading-[12px]
        h-[28px]
        px-[12px]
        py-[8px]
        gap-[4px]
        flex-shrink-0
        whitespace-nowrap
      "
    >
      {displayName}
    </span>
  );
}

export default CustomTag;
