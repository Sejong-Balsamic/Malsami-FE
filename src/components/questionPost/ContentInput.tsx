import CommonTextarea from "@/components/common/CommonTextarea";

interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ContentInput({ value, onChange }: ContentTextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 2000) {
      e.target.value = e.target.value.slice(0, 2000);
    }
    onChange(e);
  };
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-suit-medium text-base">본문 내용</h2>
        <span className="text-sm text-gray-500">
          <span className={value.length > 0 ? "text-question-main" : "text-gray-500"}>{value.length} </span>/ 2000자
        </span>
      </div>
      <CommonTextarea
        value={value}
        onChange={handleChange}
        placeholder="본문을 작성해주세요.(2000자 이하)"
        maxLength={2000}
        required
        className="font-suit-medium border-ui-divider focus:border-question-main h-[220px] w-full rounded-[8px] border-2 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}

export default ContentInput;
