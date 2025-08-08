import React from "react";

interface CustomTagProps {
  tagName: string;
}

function CustomTag({ tagName }: CustomTagProps) {
  // tagName이 undefined이거나 null인 경우 빈 문자열로 처리
  const safeTagName = tagName || "";
  // 태그명이 너무 길면 줄임표 처리 (6글자 제한)
  const displayName = safeTagName.length > 6 ? `${safeTagName.slice(0, 6)}..` : safeTagName;

  return (
    <span className="inline-flex h-[28px] flex-shrink-0 items-center justify-center gap-[4px] whitespace-nowrap rounded-[34px] bg-ui-divider-thick px-[12px] py-[8px] text-[12px] font-medium leading-[12px] text-[#898989]">
      {displayName}
    </span>
  );
}

export default CustomTag;
