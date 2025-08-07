import docCategoryTags from "@/types/docCategoryTags";

interface DocumentJiJeongTagSelectorProps {
  selectedTags: string[];
  onTagsSelect: (tags: string[]) => void;
}

export default function DocumentJiJeongTagSelector({ selectedTags, onTagsSelect }: DocumentJiJeongTagSelectorProps) {
  const handleToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsSelect(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 2) {
      onTagsSelect([...selectedTags, tag]);
    } else {
      onTagsSelect([selectedTags[1], tag]);
    }
  };

  return (
    <div>
      <h2 className="font-suit-medium mb-3 text-base">
        기본 태그 <span className="font-suit-medium ml-1.5 text-[14px] text-[#A4A4A4]">최대 2개</span>
      </h2>

      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {docCategoryTags.map(category => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleToggle(category.name)}
            className={`font-suit-medium rounded-full border-[1px] px-3 py-2 text-[16px] transition-colors ${
              selectedTags.includes(category.name)
                ? "border-document-main text-document-main"
                : "border-ui-muted bg-white text-[#898989]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
