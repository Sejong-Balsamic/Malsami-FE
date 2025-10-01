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
      className={`font-suit-bold flex items-center justify-center rounded-[20px] border px-3 py-2 text-[16px] hover:bg-gray-50 ${
        isSelected ? "border-document-main text-document-main" : "border-ui-muted text-tag-custom-text"
      }`}
    >
      {label}
    </button>
  );
}
