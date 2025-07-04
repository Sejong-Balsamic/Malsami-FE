interface TwoTabFilterProps<T extends string> {
  firstTab: T;
  secondTab: T;
  activeTab: T;
  onTabChange: (tab: T) => void;
  activeColor?: string;
}

export default function TwoTabFilter<T extends string>({
  firstTab,
  secondTab,
  activeTab,
  onTabChange,
  activeColor,
}: TwoTabFilterProps<T>) {
  return (
    <div className="relative w-full">
      {/* 탭 버튼들 */}
      <div className="flex">
        {/* 첫 번째 탭 */}
        <button type="button" onClick={() => onTabChange(firstTab)} className="flex-1 pb-3 text-center">
          <span
            className={`text-SUIT_18 ${activeTab === firstTab ? `font-semibold` : "font-medium text-ui-muted"}`}
            style={{ color: activeTab === firstTab ? activeColor : undefined }}
          >
            {firstTab}
          </span>
        </button>

        {/* 두 번째 탭 */}
        <button type="button" onClick={() => onTabChange(secondTab)} className="flex-1 pb-3 text-center">
          <span
            className={`text-SUIT_18 ${activeTab === secondTab ? `font-semibold` : "font-medium text-ui-muted"}`}
            style={{ color: activeTab === secondTab ? activeColor : undefined }}
          >
            {secondTab}
          </span>
        </button>
      </div>

      {/* 기본 언더바 (회색) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-[2px] bg-ui-divider" />

      {/* 활성 언더바 */}
      <div
        className={`absolute bottom-0 h-[4px] w-1/2 rounded-[2px] transition-transform duration-300 ${
          activeTab === firstTab
            ? "left-0" // 왼쪽 절반
            : "right-0" // 오른쪽 절반
        }`}
        style={{ backgroundColor: activeColor }}
      />
    </div>
  );
}

TwoTabFilter.defaultProps = {
  activeColor: "question.main",
};
