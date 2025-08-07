import QuestionCommonInput from "@/components/common/QuestionCommonInput";

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20);
    }
    onChange(e);
  };
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-suit-medium mb-3 text-base">제목</h2>
        <span className="text-sm text-gray-500">
          <span className={value.length > 0 ? "text-document-main" : "text-gray-500"}>{value.length}</span> / 20자
        </span>
      </div>
      <QuestionCommonInput
        name="title"
        value={value}
        onChange={handleChange}
        placeholder="제목을 입력해주세요"
        className="font-suit-medium w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] text-base placeholder-gray-400 focus:border-document-main focus:outline-none"
      />
    </div>
  );
}
