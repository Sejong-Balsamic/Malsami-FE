import React from "react";

interface JiJeongTagProps {
  label: string;
  style?: React.CSSProperties; // 스타일 속성
  onClick?: () => void; // 클릭 이벤트 추가
}

function JiJeongTag({ label, style, onClick }: JiJeongTagProps) {
  return (
    <span
      className="font-pretendard-medium mr-1 inline-block cursor-pointer rounded-[33px] bg-custom-blue-500 px-3 py-1 text-xs text-white"
      style={style} // 전달받은 스타일 적용
      onClick={onClick} // 클릭 이벤트
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          onClick();
        }
      }} // 키보드 이벤트 추가
      tabIndex={0} // 키보드 포커스 가능하게 설정
      role="button" // 접근성을 위한 역할 추가
    >
      {label}
    </span>
  );
}

// 기본값 설정
JiJeongTag.defaultProps = {
  style: {}, // 기본 스타일
  onClick: undefined, // 기본 클릭 이벤트 없음
};

export default JiJeongTag;
