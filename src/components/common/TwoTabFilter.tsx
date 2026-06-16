// 활성 탭 색상 테마 (프로젝트 색상 토큰으로 통일)
type ActiveColorTheme = "document" | "question";

// 테마별 Tailwind 클래스 매핑 (동적 클래스 조합 시 purge 방지를 위해 리터럴로 명시)
const activeColorClassMap: Record<ActiveColorTheme, { text: string; bg: string }> = {
  document: { text: "text-document-main", bg: "bg-document-main" },
  question: { text: "text-question-main", bg: "bg-question-main" },
};

interface TwoTabFilterProps<T extends string> {
  firstTab: T;
  secondTab: T;
  activeTab: T;
  onTabChange: (tab: T) => void;
  activeColor?: ActiveColorTheme;
}

export default function TwoTabFilter<T extends string>({
  firstTab,
  secondTab,
  activeTab,
  onTabChange,
  activeColor,
}: TwoTabFilterProps<T>) {
  const colorClasses = activeColorClassMap[activeColor ?? "question"];

  return (
    <div className="relative w-full">
      {/* 탭 버튼들 */}
      <div className="flex">
        {/* 첫 번째 탭 */}
        <button type="button" onClick={() => onTabChange(firstTab)} className="flex-1 pb-3 text-center">
          <span
            className={`whitespace-nowrap text-SUIT_18 ${
              activeTab === firstTab ? `font-semibold ${colorClasses.text}` : "font-medium text-ui-muted"
            }`}
          >
            {firstTab}
          </span>
        </button>

        {/* 두 번째 탭 */}
        <button type="button" onClick={() => onTabChange(secondTab)} className="flex-1 pb-3 text-center">
          <span
            className={`whitespace-nowrap text-SUIT_18 ${
              activeTab === secondTab ? `font-semibold ${colorClasses.text}` : "font-medium text-ui-muted"
            }`}
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
        } ${colorClasses.bg}`}
      />
    </div>
  );
}

TwoTabFilter.defaultProps = {
  activeColor: "question",
};
