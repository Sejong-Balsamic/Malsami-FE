interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ContentInput({ value, onChange }: ContentTextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      // 글자 수 제한: 500자
      e.target.value = e.target.value.slice(0, 500);
    }
    onChange(e);
  };
  return (
    <label htmlFor="content" className="mb-[26px] block">
      <div className="flex items-center justify-between">
        <h2 className="font-suit-medium mb-3 text-base">본문</h2>
        <span className="text-sm text-gray-500">{value.length} / 500자</span>
      </div>
      <textarea
        name="content"
        placeholder="글을 작성해주세요.(최대 500자)"
        value={value}
        onChange={handleChange}
        maxLength={2000}
        required
        className="font-pretendard-medium mt-3 h-40 w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-2 text-base"
      />
    </label>
  );
}

export default ContentInput;
