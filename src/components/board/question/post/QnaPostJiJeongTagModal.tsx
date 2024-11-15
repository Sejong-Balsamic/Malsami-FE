import { useState } from "react";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import jijeongTags from "@/lib/jijeongTags";

interface QnaPostJiJeongTagModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTags: string[];
  onSubmitTags: (tags: string[]) => void;
}

function QnaPostJiJeongTagModal({ isVisible, onClose, selectedTags, onSubmitTags }: QnaPostJiJeongTagModalProps) {
  const [tags, setTags] = useState<string[]>(selectedTags);

  const toggleTag = (tag: string) => {
    setTags(
      prevTags => (prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag].slice(0, 2)), // 최대 2개 태그
    );
  };

  const handleSubmitTags = () => {
    onSubmitTags(tags);
    onClose();
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <h1 className="font-pretendard-bold mb-[20px] text-xl">
        태그 선택 <span className="font-pretendard-medium ml-1.5 text-sm text-[#A4A4A4]">최대 2개</span>
      </h1>
      <div className="mb-[40px] flex flex-wrap justify-center gap-x-2 gap-y-5">
        {jijeongTags.map(tag => (
          <button
            type="button"
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`font-pretendard-bold rounded-[40px] border-2 border-custom-blue-500 px-3 py-1 text-xs ${
              tags.includes(tag) ? "bg-custom-blue-500 text-white" : "text-custom-blue-500"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* 고정된 SubmitFormBtn */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmitTags} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaPostJiJeongTagModal;
