interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      // 글자 수 제한: 20자
      e.target.value = e.target.value.slice(0, 20);
    }
    onChange(e);
  };
  return (
    <div className="mb-[26px] block">
      <div className="relative">
        <span className="font-pretendard-semibold mr-1.5 text-lg">제목</span>
        <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
        <input
          type="text"
          name="title"
          placeholder="제목(20자 이하)"
          value={value}
          onChange={handleChange}
          maxLength={20}
          required
          className="font-pretendard-medium mt-3 w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base"
        />
        <span className="absolute right-2 mt-8 -translate-y-1/2 transform text-xs text-gray-500">
          {value.length} /20자
        </span>
      </div>
    </div>
  );
}
