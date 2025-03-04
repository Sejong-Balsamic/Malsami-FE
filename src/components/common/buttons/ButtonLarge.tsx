import React, { useState } from "react";

function ButtonLarge(): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsClicked(!isClicked);
    }
  };

  return (
    <div
      className={`h-14 w-[361px] rounded-lg ${isClicked ? "bg-gradient-to-r from-[#07e4ba] to-[#5ef48c]" : "bg-[#d1d1d1]"}`}
      onClick={() => setIsClicked(!isClicked)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <span className="font-SUIT_M font-extrabold leading-[9.60px] text-white">로그인</span>
    </div>
  );
}

export default ButtonLarge;
