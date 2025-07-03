import React from "react";

interface FilteringTagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  activeColor?: string;
}

export default function FilteringTag({ label, isSelected, onClick, activeColor = "#5EF48D" }: FilteringTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-suit-semibold flex items-center justify-center rounded-[20px] border px-3 py-[6px] text-[14px] transition-colors ${
        isSelected ? "text-white" : "border-[#D1D1D1] bg-white hover:bg-gray-50"
      } `}
      style={{
        backgroundColor: isSelected ? activeColor : undefined,
        borderColor: isSelected ? activeColor : undefined
      }}
    >
      {label}
    </button>
  );
}
