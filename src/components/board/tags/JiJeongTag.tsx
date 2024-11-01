import React from "react";

function JiJeongTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-custom-blue-500 text-white px-2 py-[3px] mr-1 rounded-[33px] text-xs font-pretendard-semibold">
      {label}
    </span>
  );
}

export default JiJeongTag;
