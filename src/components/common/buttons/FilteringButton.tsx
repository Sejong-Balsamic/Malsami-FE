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
  activeColor?: string; // 활성 색상 (선택적)
}

function FilteringButton({ type, onClick, activeColor }: FilteringButtonProps): JSX.Element {
  const getButtonStyles = () => {
    if (type === "refresh") {
      return {
        backgroundClass: "bg-white border-[1px] border-[#D1D1D1]",
        textClass: "text-[#D1D1D1] font-suit-medium text-[16px]",
        text: "초기화",
        style: {},
      };
    } else {
      // submit 버튼인 경우
      // 사용자 지정 색상이 있으면 그라디언트 생성, 없으면 기본 그라디언트 사용
      if (activeColor) {
        // 약간 밝은 버전의 색상 생성 (그라데이션용)
        const brighterColor = activeColor;

        return {
          backgroundClass: "",
          textClass: "text-white font-suit-medium text-[16px]",
          text: "확인",
          style: {
            background: `linear-gradient(to right, ${activeColor}, ${brighterColor})`,
          },
        };
      } else {
        return {
          backgroundClass: "bg-gradient-to-r from-[#07e4ba] to-[#5ef48c]",
          textClass: "text-white font-suit-medium text-[16px]",
          text: "확인",
          style: {},
        };
      }
    }
  };

  const buttonStyles = getButtonStyles();

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
      style={buttonStyles.style}
    >
      <span className={` ${buttonStyles.textClass}`}>{buttonStyles.text}</span>
    </div>
  );
}

export default FilteringButton;
