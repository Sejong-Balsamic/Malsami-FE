import CommonInput from "@/components/common/CommonInput";

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
      <h2 className="font-suit-medium mb-3 text-base">제목</h2>
      <div className="relative">
        <CommonInput
          value={value}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          className="font-suit-medium w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] text-base placeholder-gray-400 focus:border-[#00E271] focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
          <span className={value.length > 0 ? "text-question-main" : "text-gray-500"}>{value.length}</span> / 20자
        </span>
      </div>
    </div>
  );
}
