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
}: CommonTextareaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      className={`font-suit-medium border-ui-divider placeholder-ui-muted focus:border-question-main w-full rounded-[8px] border-2 px-4 py-[18px] text-[14px] transition-colors focus:outline-none ${className}`}
    />
  );
}
