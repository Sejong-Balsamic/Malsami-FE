interface QuestionFilteringTagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function QuestionFilteringTag({ label, isSelected, onClick }: QuestionFilteringTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-suit-bold flex items-center justify-center rounded-[20px] border px-3 py-2 text-[16px] hover:bg-gray-50 ${
        isSelected ? "border-question-main text-question-main" : "border-ui-muted text-tag-custom-text"
      }`}
    >
      {label}
    </button>
  );
}
