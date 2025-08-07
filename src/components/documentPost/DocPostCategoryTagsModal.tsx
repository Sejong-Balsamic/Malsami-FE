import { useState } from "react";
import Image from "next/image";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import docCategoryTags from "@/types/docCategoryTags";

interface DocPostCategoryTagsModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTags: string[];
  onSubmitTags: (tags: string[]) => void;
}

function DocPostCategoryTagsModal({ isVisible, onClose, selectedTags, onSubmitTags }: DocPostCategoryTagsModalProps) {
  const [tags, setTags] = useState<string[]>(selectedTags); // 선택된 태그 상태

  const toggleTag = (tag: string) => {
    setTags(
      prevTags => (prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag].slice(0, 2)), // 최대 2개 태그 선택
    );
  };

  const handleSubmitTags = () => {
    onSubmitTags(tags); // 선택한 태그 전달
    onClose(); // 모달 닫기
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <h1 className="font-pretendard-bold mb-[20px] text-xl">
        카테고리 <span className="font-pretendard-medium ml-1.5 text-sm text-[#A4A4A4]">최대 2개</span>
      </h1>
      <div className="mb-[30px] flex flex-col">
        {docCategoryTags.map(categoryTag => (
          <li key={categoryTag.name} className="flex flex-col rounded-xl py-[10px]">
            <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => toggleTag(categoryTag.name)} // 태그 선택/해제
              onKeyDown={e => e.key === "Enter" && toggleTag(categoryTag.name)}
              role="button"
              tabIndex={0}
            >
              <div>
                <span
                  className={`font-pretendard-medium text-base ${
                    tags.includes(categoryTag.name) ? "font-pretendard-bold text-custom-blue-500" : "text-black"
                  }`}
                >
                  {categoryTag.name}
                </span>
                <span className="font-pretendard-medium ml-2 text-sm text-[#AAAAAA]">{categoryTag.description}</span>
              </div>
              <Image
                src={tags.includes(categoryTag.name) ? "/icons/CheckedIcon.svg" : "/icons/UnCheckedIcon.svg"}
                alt={tags.includes(categoryTag.name) ? "CheckedIcon" : "UnCheckedIcon"}
                width={14}
                height={14}
              />
            </div>
          </li>
        ))}
      </div>
      {/* 고정된 Submit 버튼 */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmitTags} />
      </div>
    </BottomSheetModal>
  );
}

export default DocPostCategoryTagsModal;
