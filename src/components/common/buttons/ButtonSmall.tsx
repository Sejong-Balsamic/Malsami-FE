import React from "react";

interface ButtonSmallProps {
  backgroundClass: string;
  textClass: string;
  text: string;
}

function ButtonSmall({ backgroundClass, textClass, text }: ButtonSmallProps): JSX.Element {
  return (
    <div
      className={`h-11 w-36 rounded-lg ${backgroundClass} flex cursor-pointer items-center justify-center`}
      role="button"
      tabIndex={0}
    >
      <span className={`font-SUIT_M font-extrabold leading-[9.60px] ${textClass}`}>{text}</span>
    </div>
  );
}

export default ButtonSmall;