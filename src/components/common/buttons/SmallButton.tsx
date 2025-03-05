import React from "react";

/**
 * SmallButton 컴포넌트
 * [ History ]
 * 2025.03.05: 이유진 : ButtomSmall init
 * 2025.03.05: 서새찬 : Component 이름 변경 ButtonSmall -> SmallButton
 *
 * 사용 예시:
 *
 * // 단색 배경 버튼
 * <ButtonSmall backgroundClass="bg-[#d1d1d1]" textClass="text-white" text="단색 버튼" />
 *
 * // 그라디언트 배경 버튼
 * <ButtonSmall backgroundClass="bg-gradient-to-r from-[#07e4ba] to-[#5ef48c]" textClass="text-white" text="그라디언트 버튼" />
 */

interface ButtonSmallProps {
  backgroundClass: string;
  textClass: string;
  text: string;
}

function SmallButton({ backgroundClass, textClass, text }: ButtonSmallProps): JSX.Element {
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

export default SmallButton;
