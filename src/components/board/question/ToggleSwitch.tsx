interface ToggleSwitchProps {
  isChaeTak: boolean;
  toggleSwitch: () => void;
}

function ToggleSwitch({ isChaeTak, toggleSwitch }: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        aria-label={isChaeTak ? "채택됨" : "채택되지 않음"} // 접근성 레이블 추가
        className={`w-[28px] h-[16px] flex items-center rounded-full py-0.5 mr-1 cursor-pointer focus:outline-none ${
          isChaeTak ? "bg-[#5ED513]" : "bg-[#737373]"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
            isChaeTak ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default ToggleSwitch;
