import React from "react";

/**
 * FilteringButton 컴포넌트
 *
 * [ History ]
 * 2025.03.05: 이유진 : LargeButton init
 * 2025.03.05: 서새찬 : Component 이름 변경 : ButtonLarge -> LargeButton
 *
 * 초기화 버튼 (흰 배경, 회색 글자)
 * <FilteringButton type="refresh" />
 *
 * 확인 버튼 (그라디언트 배경, 흰색 글자)
 * <FilteringButton type="submit" />
 */

interface FilteringButtonProps {
  type: "refresh" | "submit";
}

function FilteringButton({ type }: FilteringButtonProps): JSX.Element {
  const buttonStyles = {
    refresh: {
      backgroundClass: "bg-white",
      textClass: "text-[#848484]",
      text: "초기화",
    },
    submit: {
      backgroundClass: "bg-gradient-to-r from-[#07e4ba] to-[#5ef48c]",
      textClass: "text-white",
      text: "확인",
    },
  }[type];

  return (
    <div
      className={`w-42 h-11 rounded-lg ${buttonStyles.backgroundClass} flex cursor-pointer items-center justify-center`}
      role="button"
      tabIndex={0}
    >
      <span className={`font-SUIT_M font-extrabold leading-[9.60px] ${buttonStyles.textClass}`}>
        {buttonStyles.text}
      </span>
    </div>
  );
}

export default FilteringButton;
