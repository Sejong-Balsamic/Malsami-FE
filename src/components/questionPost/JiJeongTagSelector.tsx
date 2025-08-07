import { QuestionPresetTagLabels } from "@/types/api/constants/questionPresetTag";
import { JiJeongTagSelectorProps } from "./QuestionPostTypes";

function JiJeongTagSelector({ selectedTags, onTagsSelect }: JiJeongTagSelectorProps) {
  const handleTagToggle = (tag: string) => {
    // 이미 선택된 태그라면 해제
    if (selectedTags.includes(tag)) {
      onTagsSelect(selectedTags.filter(t => t !== tag));
      return;
    }
    // 2개 미만일 때만 새 태그 추가
    if (selectedTags.length < 2) {
      onTagsSelect([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <h2 className="font-suit-medium mb-3 text-base">기본 태그</h2>

      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {Object.entries(QuestionPresetTagLabels).map(([tag, label]) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagToggle(tag)}
            className={`font-suit-medium rounded-full border-[1px] px-3 py-2 text-[16px] transition-colors ${
              selectedTags.includes(tag)
                ? "border-question-main text-question-main"
                : "border-ui-muted bg-white text-[#898989]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JiJeongTagSelector;
