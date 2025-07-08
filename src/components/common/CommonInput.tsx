export interface CommonInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function CommonInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className = "w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] font-suit-medium text-[14px] placeholder-[#C5C5C5] focus:outline-none focus:border-[#00E271] transition-colors",
}: CommonInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
}

CommonInput.defaultProps = {
  onKeyDown: undefined,
  placeholder: "",
  className:
    "w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] font-suit-medium text-[14px] placeholder-gray-400 focus:outline-none focus:border-[#00E271] transition-colors",
};
