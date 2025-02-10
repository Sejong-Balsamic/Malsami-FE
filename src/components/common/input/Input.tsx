// /* eslint-disable */

// import { InputHTMLAttributes } from "react";
// import clsx from "clsx"; //여러 개의 className을 동적으로 조합할 때 유용

// // InputHTMLAttributes<HTMLInputElement>는 <input> 태그에서 사용할 수 있는 모든 기본 속성을 포함
// // & { label: string; }를 추가하여 label이라는 커스텀 속성 추가
// type InputProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
// };

// function Input({ label, className, ...props }: InputProps) {
//   return (
//     <label className="block w-full text-SUIT_14 font-medium text-[#C2C2C2]">
//       {label}
//       <input
//         className={clsx(
//           "mt-1 w-full py-2 text-SUIT_16 text-black caret-[#09E5BA]", // 공통 스타일
//           "border-b-2 border-[##E6E6E6]", // focus 되지 않은 상태의 border
//           "focus:border-b-2 focus:outline-none", // focus 상태의 border
//           className,
//         )}
//         style={{
//           borderImageSource: "linear-gradient(to right, #08E4BB, #5FF48D)",
//           borderImageSlice: 1,
//         }}
//         {...props}
//       />
//     </label>
//   );
// }

// export default Input;

// Fix: 위에 코드와 같이  tailwind의 자체 focus 속성만으로 focus 시 border-b색 변하게 수정 필요
import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, className, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false); // focus 상태를 저장할 state

  const handleFocus = () => {
    setIsFocused(true); // focus 되었을 때 state를 true로 변경
  };

  const handleBlur = () => {
    setIsFocused(false); // focus가 해제되었을 때 state를 false로 변경
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="block w-full text-SUIT_14 font-medium text-[#C2C2C2]">
      {label}
      <input
        className={clsx(
          "mt-1 w-full py-2 text-SUIT_16 text-black caret-[#09E5BA]", // 공통 스타일
          "border-b-2 border-[##E6E6E6]", // focus 되지 않은 상태의 border
          "focus:border-b-2 focus:outline-none", // focus 상태의 border
          className,
        )}
        style={{
          // isFocused state에 따라 border 스타일 변경
          ...(isFocused && {
            borderImageSource: "linear-gradient(to right, #08E4BB, #5FF48D)",
            borderImageSlice: 1,
          }),
        }}
        onFocus={handleFocus} // input 요소에 focus 되었을 때 handleFocus 함수 호출
        onBlur={handleBlur} // input 요소에서 focus가 해제되었을 때 handleBlur 함수 호출
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </label>
  );
}

export default Input;
