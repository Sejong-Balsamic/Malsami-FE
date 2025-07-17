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
      className={`font-suit-semibold flex items-center justify-center rounded-[20px] border px-3 py-[6px] text-[14px] transition-colors ${
        isSelected ? "border-[#5EF48D] bg-[#5EF48D] text-white" : "border-[#D1D1D1] bg-white hover:bg-gray-50"
      } `}
    >
      {label}
    </button>
  );
}
