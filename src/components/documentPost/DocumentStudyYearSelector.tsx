import docStudyYears from "@/types/docStudyYears";

interface DocumentStudyYearSelectorProps {
  year: number;
  onYearChange: (year: number) => void;
}

export default function DocumentStudyYearSelector({ year, onYearChange }: DocumentStudyYearSelectorProps) {
  return (
    <div>
      <h2 className="font-suit-medium mb-3 text-base">수강 년도</h2>

      <div className="flex gap-3">
        <select
          value={year}
          onChange={e => onYearChange(Number(e.target.value))}
          className="font-suit-medium rounded-[8px] border-2 border-ui-divider px-8 py-[18px] text-[14px] focus:border-document-main focus:outline-none"
        >
          {docStudyYears.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
