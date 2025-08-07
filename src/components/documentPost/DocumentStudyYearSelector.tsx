import docStudyYears from "@/types/docStudyYears";
import Image from "next/image";

interface DocumentStudyYearSelectorProps {
  year: number;
  onYearChange: (year: number) => void;
}

export default function DocumentStudyYearSelector({ year, onYearChange }: DocumentStudyYearSelectorProps) {
  return (
    <div>
      <h2 className="font-suit-medium mb-3 text-base">수강 연도</h2>

      <div className="flex items-center gap-1.5">
        {/* 커스텀 셀렉트 박스 */}
        <div className="relative inline-flex items-center">
          <select
            value={year}
            onChange={e => onYearChange(Number(e.target.value))}
            className="font-suit-medium peer appearance-none rounded-[8px] border-2 border-ui-divider bg-transparent px-6 py-[14px] pr-10 text-[14px] text-black transition-colors focus:border-document-main focus:outline-none"
          >
            {docStudyYears.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* 드롭다운 화살표 */}
          <Image
            src="/icons/dropdownUnchecked.svg"
            alt="arrow"
            width={14}
            height={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 peer-focus:hidden"
          />
          <Image
            src="/icons/dropdownChecked.svg"
            alt="arrow active"
            width={14}
            height={14}
            className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 peer-focus:block"
          />
        </div>

        {/* 단위 표시 */}
        <span className="font-suit-medium text-base">년</span>
      </div>
    </div>
  );
}
