import React from "react";

function JiJeongTag({ label }: { label: string }) {
  return (
    <span className="font-pretendard-medium mr-1 inline-block rounded-[33px] bg-custom-blue-500 px-2 py-[3px] text-xs text-white">
      {label}
    </span>
  );
}

export default JiJeongTag;
