import { useState } from "react";
import subjects from "@/types/subjects";
import CommonInput from "@/components/common/CommonInput";
import { SubjectSelectorProps } from "./QuestionPostTypes";

function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // 필터링된 과목명 목록 업데이트
    if (newValue.trim()) {
      const filtered = subjects.filter(subject => subject.toLowerCase().includes(newValue.toLowerCase()));
      setFilteredSubjects(filtered.slice(0, 5)); // 최대 5개 표시
    } else {
      setFilteredSubjects([]);
    }

    setActiveSuggestionIndex(-1);
  };

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex(prevIndex => (prevIndex < filteredSubjects.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      onChange(filteredSubjects[activeSuggestionIndex]);
      setFilteredSubjects([]);
    }
  };

  // 과목 선택 처리
  const handleSelectSubject = (subject: string) => {
    onChange(subject);
    setFilteredSubjects([]);
  };

  return (
    <div className="relative w-full">
      <h2 className="font-suit-medium mb-3 text-base">과목명</h2>

      <CommonInput
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="교과목명을 입력하세요"
      />

      {filteredSubjects.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-md">
          {filteredSubjects.map((subject, index) => (
            <button
              key={subject}
              type="button"
              onClick={() => handleSelectSubject(subject)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSelectSubject(subject);
              }}
              className={`w-full cursor-pointer px-4 py-2 text-left text-sm ${
                index === activeSuggestionIndex ? "bg-gray-100" : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectSelector;
