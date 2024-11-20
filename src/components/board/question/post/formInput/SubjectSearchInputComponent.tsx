import SubjectSearchInput from "../../SubjectSearchInput";

interface SubjectSearchInputProps {
  value: string;
  onChange: (subject: string) => void;
}

export default function SubjectSearchInputComponent({ value, onChange }: SubjectSearchInputProps) {
  return (
    <div className="mb-[26px] block">
      <div className="mb-3">
        <span className="font-pretendard-semibold mr-1.5 text-lg">교과목명 검색</span>
        <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
      </div>
      <SubjectSearchInput value={value} onChange={onChange} />
    </div>
  );
}
