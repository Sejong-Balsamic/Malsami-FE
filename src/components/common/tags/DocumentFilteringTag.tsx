interface DocumentFilteringTagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DocumentFilteringTag({ label, isSelected, onClick }: DocumentFilteringTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-suit-bold flex items-center justify-center rounded-[20px] border px-3 py-2 hover:bg-gray-50 text-[16px]${
        isSelected ? "border-1 border-[#00D1F2] text-[#00D1F2]" : "border-[#C5C5C5] text-[#898989]"
      } `}
    >
      {label}
    </button>
  );
}
