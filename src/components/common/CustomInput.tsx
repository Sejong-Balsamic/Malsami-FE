/* eslint-disable */

import { InputHTMLAttributes, ReactNode, useState } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  rightElement?: ReactNode; // 입력창 우측에 배치할 요소 (아이콘 등)
};

function CustomInput({ label, className, rightElement, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className="block w-full text-SUIT_14 font-medium text-[#C2C2C2]">
      {label}
      <div className="relative mt-1 w-full">
        <input
          className={clsx(
            "w-full border-2 px-4 py-3 text-SUIT_16 text-black outline-none transition-all duration-200",
            isFocused ? "rounded-lg border-transparent" : "rounded-lg border-ui-border",
            // 우측 아이콘 공간 확보
            rightElement ? "pr-12" : "",
            className,
          )}
          style={
            isFocused
              ? {
                  borderImageSource: "linear-gradient(to right, #00D1F2, #00E271)",
                  borderImageSlice: 1,
                }
              : {}
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightElement && <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">{rightElement}</span>}
      </div>
    </label>
  );
}

export default CustomInput;
