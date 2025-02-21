import { useState } from "react";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";

interface CustomTagsModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialTags: string[];
  onTagsSubmit: (tags: string[]) => void;
}

export default function QnaPostCustomTagsModal({
  isVisible,
  onClose,
  initialTags,
  onTagsSubmit,
}: CustomTagsModalProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState<string>("");

  // 커스텀 태그 추가 함수
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if ((e.key === "Enter" || e.key === "Tab") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();

      // 유효한 태그 조건 확인
      if (newTag.length <= 10 && tags.length < 4 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      // tagInput을 비동기적으로 초기화해, 키 입력 처리와 상태 초기화 사이의 타이밍 문제 해결.
      setTimeout(() => setTagInput(""), 0);
    }
  };

  // 태그 입력 값 변경 함수
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }
    setTagInput(e.target.value.trim());
  };

  // 태그 삭제 함수
  const removeTag = (tag: string): void => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmitTags = () => {
    onTagsSubmit(tags);
    onClose();
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <span className="font-pretendard-semibold mb-4 text-lg">커스텀 태그 설정</span>
      <p className="font-pretendard-medium mb-[30px] text-sm text-gray-500">최대 10자, 4개 이하</p>
      <div className="mb-6">
        {/* 태그 Input */}
        <div className="relative mb-2.5">
          <input
            type="text"
            name="customTags"
            placeholder="Tab, Enter로 태그 입력"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            maxLength={10}
            className="w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-sm placeholder-gray-400"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
            {tagInput.length} /10자
          </span>
        </div>

        {/* 태그 리스트 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="font-pretendard-medium flex items-center rounded-full border-[2px] border-[#E7E7E7] bg-white px-3 py-1 text-xs text-[#AAAAAA]"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{
                  marginLeft: "4px",
                  fontSize: "16px",
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      {/* Submit Button */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmitTags} />
      </div>
    </BottomSheetModal>
  );
}
