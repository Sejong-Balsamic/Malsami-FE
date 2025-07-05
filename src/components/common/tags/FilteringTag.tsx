import React from "react";

interface FilteringTagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  activeColor?: string;
}

export default function FilteringTag({ label, isSelected, onClick, activeColor }: FilteringTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-suit-semibold flex items-center justify-center rounded-[20px] border px-3 py-[6px] text-[14px] transition-colors ${
        isSelected ? "text-white" : "border-ui-divider bg-white hover:bg-gray-50"
      } `}
      style={{
        backgroundColor: isSelected ? activeColor : undefined,
        borderColor: isSelected ? activeColor : undefined,
      }}
    >
      {label}
    </button>
  );
}

FilteringTag.defaultProps = {
  activeColor: "question.main",
};
