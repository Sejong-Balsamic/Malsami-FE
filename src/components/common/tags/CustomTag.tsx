import React from "react";

type CustomTagProps = {
  tagName: string;
};

function CustomTag({ tagName }: CustomTagProps) {
  // 태그명이 너무 길면 줄임표 처리 (6글자 제한)
  const displayName = tagName.length > 6 ? `${tagName.slice(0, 6)}..` : tagName;

  return (
    <span className="text-text-secondary inline-flex h-7 flex-shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-ui-divider-thick px-3 py-2 text-xs font-medium leading-3">
      {displayName}
    </span>
  );
}

export default CustomTag;
