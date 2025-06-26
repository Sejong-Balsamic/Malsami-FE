import React from "react";

/**
 * FilteringButton 컴포넌트
 *
 * [ History ]
 * 2025.03.05: 이유진 : LargeButton init
 * 2025.03.05: 서새찬 : Component 이름 변경 : ButtonLarge -> LargeButton
 *
 * 초기화 버튼 (흰 배경, 회색 글자)
 * <FilteringButton type="refresh" onClick={handleReset} />
 *
 * 확인 버튼 (그라디언트 배경, 흰색 글자)
 * <FilteringButton type="submit" onClick={handleConfirm} />
 */

interface FilteringButtonProps {
  type: "refresh" | "submit";
  onClick: () => void;
}

function FilteringButton({ type, onClick }: FilteringButtonProps): JSX.Element {
  const buttonStyles = {
    refresh: {
      backgroundClass: "bg-white border-[1px] border-[#D1D1D1]",
      textClass: "text-[#D1D1D1] font-suit-medium text-[16px]",
      text: "초기화",
    },
    submit: {
      backgroundClass: "bg-gradient-to-r from-[#07e4ba] to-[#5ef48c]",
      textClass: "text-white font-suit-medium text-[16px]",
      text: "확인",
    },
  }[type];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`h-11 flex-1 rounded-lg ${buttonStyles.backgroundClass} flex cursor-pointer items-center justify-center transition-all duration-200 hover:opacity-90`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className={` ${buttonStyles.textClass}`}>{buttonStyles.text}</span>
    </div>
  );
}

export default FilteringButton;
