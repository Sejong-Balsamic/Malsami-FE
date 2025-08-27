/* eslint-disable */

import { InputHTMLAttributes, ReactNode, useState } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  rightElement?: ReactNode; // 입력창 우측에 배치할 요소 (아이콘 등)
};

function LoginInput({ label, className, rightElement, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className="block w-full text-SUIT_14 font-medium text-ui-muted">
      {label}
      <div className="relative mt-1 w-full">
        <div
          className={clsx(
            "relative rounded-lg transition-all duration-200",
            isFocused ? "bg-gradient-to-r from-document-main to-question-main p-0.5" : "",
          )}
        >
          <input
            className={clsx(
              "w-full rounded-lg bg-white px-4 py-3 text-SUIT_16 text-black outline-none transition-all duration-200",
              isFocused ? "border-0" : "border-2 border-ui-border",
              // 우측 아이콘 공간 확보
              rightElement ? "pr-12" : "",
              className,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightElement && <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">{rightElement}</span>}
        </div>
      </div>
    </label>
  );
}

export default LoginInput;
