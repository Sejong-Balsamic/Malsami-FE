import React from "react";

interface JiJeongTagProps {
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props
  title?: string; // label과 동일한 역할 (호환성을 위해 추가)
  color?: string; // 배경색을 변경할 수 있도록 함
  style?: React.CSSProperties; // 추가 스타일
  onClick?: () => void; // 클릭 이벤트 핸들러
}

function JiJeongTag({ label, title, color, style, onClick }: JiJeongTagProps) {
  // label이 있으면 사용, 없으면 title 사용
  const displayLabel = label || title || "";

  // 전달받은 style에 color prop이 있다면 배경색으로 병합
  const computedStyle: React.CSSProperties = {
    backgroundColor: color || "#3b82f6", // color가 없으면 기본 파란색 (예시)
    ...style,
  };

  return (
    <span
      className="font-pretendard-medium mr-1 inline-block cursor-pointer rounded-[33px] px-3 py-1 text-xs text-white"
      style={computedStyle}
      onClick={onClick}
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      {displayLabel}
    </span>
  );
}

JiJeongTag.defaultProps = {
  style: {},
  onClick: undefined,
  color: "#3b82f6",
};

export default JiJeongTag;
