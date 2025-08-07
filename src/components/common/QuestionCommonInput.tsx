export interface QuestionCommonInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  /** HTML name attribute (used when parent onChange relies on e.target.name) */
  name?: string;
}

export default function QuestionCommonInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className = "w-full rounded-[8px] border-2 border-ui-divider px-4 py-[18px] text-SUIT_14 font-medium placeholder-ui-muted focus:outline-none focus:border-question-main transition-colors",
  name,
}: QuestionCommonInputProps) {
  return (
    <input
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
}

QuestionCommonInput.defaultProps = {
  onKeyDown: undefined,
  placeholder: "",
  className:
    "w-full rounded-[8px] border-2 border-ui-divider px-4 py-[18px] text-SUIT_14 font-medium placeholder-ui-muted focus:outline-none focus:border-question-main transition-colors",
  name: undefined,
};
