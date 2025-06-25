interface WeeklyDailyTabFilterProps {
  activeTab: "주간" | "일간";
  onTabChange: (tab: "주간" | "일간") => void;
}

export default function WeeklyDailyTabFilter({ activeTab, onTabChange }: WeeklyDailyTabFilterProps) {
  return (
    <div className="relative w-full">
      {/* 탭 버튼들 */}
      <div className="flex">
        {/* 주간 탭 */}
        <button type="button" onClick={() => onTabChange("주간")} className="flex-1 pb-3 text-center">
          <span
            className={`text-SUIT_18 ${
              activeTab === "주간" ? "font-semibold text-[#00E8BB]" : "font-medium text-[#C5C5C5]"
            }`}
          >
            주간
          </span>
        </button>

        {/* 일간 탭 */}
        <button type="button" onClick={() => onTabChange("일간")} className="flex-1 pb-3 text-center">
          <span
            className={`text-SUIT_18 ${
              activeTab === "일간" ? "font-semibold text-[#00E8BB]" : "font-medium text-[#C5C5C5]"
            }`}
          >
            일간
          </span>
        </button>
      </div>

      {/* 기본 언더바 (회색) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-[2px] bg-[#E2E2E2]" />

      {/* 활성 언더바 (초록색) */}
      <div
        className={`absolute bottom-0 h-[4px] w-1/2 rounded-[2px] bg-[#00E8BB] transition-transform duration-300 ${
          activeTab === "주간"
            ? "left-0" // 왼쪽 절반
            : "right-0" // 오른쪽 절반
        }`}
      />
    </div>
  );
}
