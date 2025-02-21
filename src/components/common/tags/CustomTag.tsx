import React from "react";

type CustomTagProps = {
  tagName: string;
};

function CustomTag({ tagName }: CustomTagProps) {
  return (
    <span className="rounded-[14px] bg-[#DEFFD8] px-2.5 py-[2px] text-SUIT_12 font-semibold leading-[20px] text-[#00D342]">
      {tagName}
    </span>
  );
}

export default CustomTag;
