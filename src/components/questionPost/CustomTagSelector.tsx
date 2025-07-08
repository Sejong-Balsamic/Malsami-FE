import { useState, useRef } from "react";
import Image from "next/image";
import { CustomTagSelectorProps } from "./QuestionPostTypes";

function CustomTagSelector({ tags, onTagsSubmit, onRemoveTag }: CustomTagSelectorProps) {
  const [inputValue, setInputValue] = useState("");
  const lastKeyRef = useRef<string | null>(null);
  const composingRef = useRef<boolean>(false);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.slice(0, 10));
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = () => {
    composingRef.current = false;
  };

  const addTag = () => {
    if (!inputValue.trim()) return;

    const newTag = inputValue.trim();

    // 유효한 태그 조건 확인
    if (newTag.length <= 10 && tags.length < 4 && !tags.includes(newTag)) {
      onTagsSubmit([...tags, newTag]);
    }

    setInputValue("");
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 중에는 키 이벤트를 처리하지 않음
    if (composingRef.current) return;

    // Enter나 Tab 키 입력 시 태그 추가
    if ((e.key === "Enter" || e.key === "Tab") && inputValue.trim()) {
      e.preventDefault();

      // 중복 이벤트 방지
      if (lastKeyRef.current === e.key && Date.now() - (lastKeyRef.current as any) < 100) {
        return;
      }

      lastKeyRef.current = e.key;
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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          className="font-suit-medium w-full rounded-[8px] border-2 border-[#E2E2E2] px-4 py-[18px] text-[14px] placeholder-gray-400 transition-colors focus:border-[#00E271] focus:outline-none"
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
              className="font-suit-bold flex cursor-pointer items-center rounded-full border-[1px] border-[#00E271] bg-white px-3 py-2 text-[16px] text-[#00E271] hover:bg-gray-50"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") onRemoveTag(tag);
              }}
            >
              <Image
                src="/icons/interface-delete-circle--button-delete-remove-add-circle-buttons--Streamline-Core.svg"
                className="mr-1"
                alt="삭제"
                width={16}
                height={16}
              />
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomTagSelector;
