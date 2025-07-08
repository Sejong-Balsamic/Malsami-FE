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
  placeholder,
  className = "w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] font-suit-medium text-[14px] placeholder-[#C5C5C5] focus:outline-none focus:border-[#00E271] transition-colors",
  maxLength,
  name,
  required,
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
      className={className}
    />
  );
}

CommonTextarea.defaultProps = {
  onKeyDown: undefined,
  placeholder: "",
  className:
    "w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] font-suit-medium text-[14px] placeholder-gray-400 focus:outline-none focus:border-[#00E271] transition-colors",
  maxLength: undefined,
  name: undefined,
  required: false,
};
