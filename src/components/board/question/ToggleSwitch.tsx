interface ToggleSwitchProps {
  isChaeTak: boolean;
  toggleSwitch: () => void;
}

function ToggleSwitch({ isChaeTak, toggleSwitch }: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-[28px] h-[16px] flex items-center bg-gray-300 rounded-full py-0.5 mr-1 cursor-pointer ${
          isChaeTak ? "bg-[#5ED513]" : "bg-[#737373]"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
            isChaeTak ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
