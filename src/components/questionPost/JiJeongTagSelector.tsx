import { QuestionPresetTagLabels } from "@/types/api/constants/questionPresetTag";
import { JiJeongTagSelectorProps } from "./QuestionPostTypes";

function JiJeongTagSelector({ selectedTags, onTagsSelect }: JiJeongTagSelectorProps) {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // 이미 선택된 태그면 제거
      onTagsSelect(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 2) {
      // 선택되지 않은 태그면 추가 (최대 2개)
      onTagsSelect([...selectedTags, tag]);
    } else {
      // 2개 이상 선택시 첫 번째 태그 제거하고 새 태그 추가
      onTagsSelect([selectedTags[1], tag]);
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
