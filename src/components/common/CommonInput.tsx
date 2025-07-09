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
  className = "w-full rounded-[8px] border-2 border-ui-divider px-4 py-[18px] text-SUIT_14 font-medium placeholder-ui-muted focus:outline-none focus:border-question-main transition-colors",
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
    "w-full rounded-[8px] border-2 border-ui-divider px-4 py-[18px] text-SUIT_14 font-medium placeholder-ui-muted focus:outline-none focus:border-question-main transition-colors",
};
