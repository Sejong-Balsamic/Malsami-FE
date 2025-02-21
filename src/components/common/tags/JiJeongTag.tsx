import React from "react";

interface JiJeongTagProps {
  tag: string;
  onRemove?: (tag: string) => void;
  isRemovable?: boolean;
}

const JiJeongTag: React.FC<JiJeongTagProps> = ({ tag, onRemove, isRemovable = false }) => {
  return (
    <div className="flex items-center gap-1 rounded-[10px] bg-[#F5F5F5] px-2 py-1 text-sm text-[#666666]">
      {tag}
      {isRemovable && (
        <button
          onClick={() => onRemove?.(tag)}
          className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default JiJeongTag;
