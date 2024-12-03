// import React from "react";

// interface JiJeongTagProps {
//   label: string;
//   style?: React.CSSProperties; // style 속성 추가
// }

// function JiJeongTag({ label, style }: JiJeongTagProps) {
//   return (
//     <span
//       className="font-pretendard-medium mr-1 inline-block rounded-[33px] bg-custom-blue-500 px-2 py-[3px] text-xs text-white"
//       style={style} // 전달받은 style 적용
//     >
//       {label}
//     </span>
//   );
// }

// export default JiJeongTag;
import React from "react";

interface JiJeongTagProps {
  label: string;
  style?: React.CSSProperties; // style 속성 추가
}

function JiJeongTag({ label, style }: JiJeongTagProps) {
  return (
    <span
      className="font-pretendard-medium mr-1 inline-block rounded-[33px] bg-custom-blue-500 px-3 py-1 text-xs text-white"
      style={style} // 전달받은 style 적용
    >
      {label}
    </span>
  );
}

// 기본값 설정. build 에러
JiJeongTag.defaultProps = {
  style: {}, // 기본값: 빈 객체
};

export default JiJeongTag;
