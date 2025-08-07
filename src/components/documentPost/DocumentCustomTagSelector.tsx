import { useState } from "react";
import Image from "next/image";
import { CustomTagSelectorProps } from "../questionPost/QuestionPostTypes";

function CustomTagSelector({ tags, onTagsSubmit, onRemoveTag }: CustomTagSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 10); // 최대 10자 제한
    setInputValue(val);
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0 || trimmed.length > 10 || tags.includes(trimmed) || tags.length >= 4) return;
    onTagsSubmit([...tags, trimmed]);
    setInputValue("");
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "Tab") && inputValue.trim()) {
      // 한글 조합 중에는 이벤트 무시.
      if ((e.nativeEvent as any).isComposing) return;

      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <h2 className="font-suit-medium text-4 mb-2">자유 태그</h2>
      <h3 className="font-suit-medium mb-3 text-[14px] text-[#898989]">
        기본 태그 외에 필요한 태그가 있다면 추가해보세요!
      </h3>

      <div className="relative mb-3">
        <input
          type="text"
          placeholder="태그를 입력해주세요."
          value={inputValue}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
          maxLength={10}
          className="font-suit-medium w-full rounded-[8px] border-2 border-ui-divider px-4 py-[18px] text-[14px] placeholder-gray-400 transition-colors focus:border-document-main focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
          {inputValue.length} /10자
        </span>
      </div>

      {/* 태그 목록 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <div
              key={tag}
              onClick={() => onRemoveTag(tag)}
              className="font-suit-bold flex cursor-pointer items-center rounded-full border-[1px] border-document-main bg-white px-3 py-2 text-[16px] text-document-main hover:bg-gray-50"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") onRemoveTag(tag);
              }}
            >
              <Image src="/icons/documentDelete.svg" className="mr-1" alt="삭제" width={16} height={16} />
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomTagSelector;
