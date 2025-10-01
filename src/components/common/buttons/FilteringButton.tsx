import React from "react";
import Image from "next/image";

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
  activeColor?: string;
}

function FilteringButton({ type, onClick, activeColor }: FilteringButtonProps): JSX.Element {
  const getButtonStyles = () => {
    if (type === "refresh") {
      return {
        backgroundClass: "bg-white border border-ui-divider",
        textClass: "text-ui-muted font-suit-bold text-[18px]",
        text: "초기화",
        style: {},
      };
    }

    // submit 버튼인 경우
    // 사용자 지정 색상이 있으면 단색 배경, 없으면 기본 그라디언트 사용
    if (activeColor) {
      return {
        backgroundClass: "",
        textClass: "text-white font-suit-bold text-[18px]",
        text: "적용",
        style: {
          backgroundColor: activeColor,
        },
      };
    }

    return {
      backgroundClass: "bg-gradient-to-r from-question-main to-[#5ef48c]",
      textClass: "text-white font-suit-bold text-[18px]",
      text: "적용",
      style: {},
    };
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
      className={`h-11 w-full rounded-lg ${buttonStyles.backgroundClass} flex cursor-pointer items-center justify-center transition-all duration-200 hover:opacity-90`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={buttonStyles.style}
    >
      {type === "refresh" && (
        <Image
          src="/icons/reset.svg"
          alt="초기화"
          width={14}
          height={14}
          className="mr-1"
          style={{
            filter:
              "invert(1) brightness(0) saturate(100%) invert(78%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(89%) contrast(89%)",
          }}
        />
      )}
      <span className={` ${buttonStyles.textClass}`}>{buttonStyles.text}</span>
    </div>
  );
}

FilteringButton.defaultProps = {
  activeColor: undefined,
};

export default FilteringButton;
