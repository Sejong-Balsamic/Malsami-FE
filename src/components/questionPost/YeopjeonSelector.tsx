/* eslint-disable react/require-default-props */
import React from "react";

interface YeopjeonSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  max?: number;
}

export default function YeopjeonSelector({ value, onChange, max = 300 }: YeopjeonSelectorProps) {
  const handleAdjust = (delta: number) => {
    const next = Math.min(Math.max(value + delta, 0), max);
    onChange(next);
  };

  const borderColor = value > 0 ? "border-[#00E271] text-black" : "border-gray-300 text-gray-400";
  const btnColor = "border border-gray-400 w-8 h-8 flex items-center justify-center rounded-full text-xl";

  return (
    <div className="flex items-center justify-center gap-4">
      {/* minus */}
      <button
        type="button"
        className={`${btnColor} ${value === 0 ? "opacity-30" : "hover:bg-gray-100"}`}
        onClick={() => handleAdjust(-1)}
        disabled={value === 0}
      >
        −
      </button>

      {/* value input */}
      <input
        type="number"
        value={value}
        onChange={e => {
          const num = Number(e.target.value);
          if (Number.isNaN(num)) return;
          const limited = Math.min(Math.max(num, 0), max);
          onChange(limited);
        }}
        className={`h-16 w-48 rounded-lg border-2 ${borderColor} text-center text-2xl font-semibold focus:border-[#00E271] focus:outline-none`}
      />

      {/* plus */}
      <button
        type="button"
        className={`${btnColor} ${value === max ? "opacity-30" : "hover:bg-gray-100"}`}
        onClick={() => handleAdjust(1)}
        disabled={value === max}
      >
        +
      </button>
    </div>
  );
}

YeopjeonSelector.defaultProps = {
  max: 300,
};
