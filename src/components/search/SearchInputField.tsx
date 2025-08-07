export default function SearchInputField({
  subject,
  searchValue,
  placeholder,
  onValueChange,
  onKeyDown,
}: {
  subject: string;
  searchValue: string;
  placeholder: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
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
        className="font-pretendard-medium flex-grow bg-transparent text-sm text-black placeholder-gray-400 outline-none"
        style={{
          flex: 1, // `input`이 나머지 공간을 차지하도록 설정
          minWidth: "0px", // `flex-grow`가 잘 동작하도록 최소 크기 제한
        }}
      />
    </div>
  );
}
