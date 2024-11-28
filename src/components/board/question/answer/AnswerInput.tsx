interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function AnswerInput({ value, onChange }: ContentTextareaProps) {
  return (
    <label htmlFor="content" className="mb-[26px] block">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-pretendard-semibold mr-1.5 text-lg">답변</span>
          <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
        </div>
        <span className="text-sm text-gray-500">{value.length} / 2000자</span>
      </div>
      <textarea
        name="content"
        placeholder="답변을 작성해주세요.(2000자 이하)"
        value={value}
        onChange={onChange}
        maxLength={2000}
        required
        className="font-pretendard-medium mt-3 h-40 w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base"
      />
    </label>
  );
}

export default AnswerInput;
