interface SearchInputFieldProps {
  subject: string;
  searchValue: string;
  placeholder: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchInputField({
  subject,
  searchValue,
  placeholder,
  onValueChange,
  onKeyDown,
}: SearchInputFieldProps) {
  return (
    <div className="flex flex-1 items-center overflow-hidden">
      {/* subject 부분 */}
      {subject && (
        <div className="mr-2 max-w-[50%] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-[#D5ECFB] px-2 py-[2px] text-sm text-[#0070F3]">
          {subject}
        </div>
      )}

      {/* input 부분 */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        className="min-w-0 flex-1 bg-transparent text-SUIT_16 font-medium leading-tight text-black placeholder-ui-muted focus:outline-none"
      />
    </div>
  );
}
