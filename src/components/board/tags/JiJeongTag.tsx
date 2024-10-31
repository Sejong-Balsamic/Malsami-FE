import React from "react";

function JiJeongTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-custom-orange-500 text-white px-2.5 py-0.5 mr-0.5 rounded-[33px] text-[11px] font-pretendard-semibold">
      {label}
    </span>
  );
}

export default JiJeongTag;
