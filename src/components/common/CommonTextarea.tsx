/* eslint-disable react/require-default-props */
import React from "react";

export interface CommonTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  name?: string;
  required?: boolean;
  contentType?: "question" | "document";
}

export default function CommonTextarea({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  className = "",
  maxLength,
  name,
  required = false,
  contentType = "question",
}: CommonTextareaProps) {
  // contentType 값에 따라 동적으로 적용할 포커스 테두리 색깔 지정
  const focusBorderClass = contentType === "document" ? "focus:border-document-main" : "focus:border-question-main";

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      className={`font-suit-medium w-full rounded-[8px] border-2 border-ui-border px-4 py-[18px] text-[14px] placeholder-ui-muted transition-colors focus:outline-none ${focusBorderClass} ${className}`}
    />
  );
}
