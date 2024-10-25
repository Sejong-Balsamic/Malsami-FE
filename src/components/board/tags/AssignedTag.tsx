import React from "react";

function AssignedTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-custom-orange-500 text-white px-3 py-1 mr-1 rounded-[15px] text-[12px] font-pretendard-semibold">
      {label}
    </span>
  );
}

export default AssignedTag;
