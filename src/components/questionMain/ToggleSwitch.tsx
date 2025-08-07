interface ToggleSwitchProps {
  isChaeTaek: boolean;
  toggleSwitch: () => void;
}

function ToggleSwitch({ isChaeTaek, toggleSwitch }: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        aria-label={isChaeTaek ? "채택됨" : "채택되지 않음"} // 접근성 레이블 추가
        className={`mr-1 flex h-[16px] w-[28px] cursor-pointer items-center rounded-full py-0.5 focus:outline-none ${
          isChaeTaek ? "bg-[#5ED513]" : "bg-[#737373]"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`h-3 w-3 transform rounded-full bg-white shadow-md transition-transform ${
            isChaeTaek ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default ToggleSwitch;
