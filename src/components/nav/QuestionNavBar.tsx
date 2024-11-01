import { useState } from "react";
import facultys from "@/lib/facultys";
import ImageWrapper from "../board/tags/ImageWrapper";

function QuestionNavBar({ onSelect }: { onSelect: (selection: string) => void }) {
  const [selected, setSelected] = useState("전체");
  const [lastSelected, setLastSelected] = useState("학부 선택"); // 직전 선택한 항목
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleSelect = (option: string) => {
    if (option !== "전체") {
      setLastSelected(option); // "전체"가 아닌 경우에만 lastSelected를 업데이트
      console.log(setLastSelected);
    }
    setSelected(option); // 항상 selected는 업데이트
    onSelect(option); // 부모 컴포넌트에 option을 전달
    setIsShowOptions(false);
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        <button
          type="button"
          className={`w-[50%] p-2 text-base font-pretendard-semibold ${
            selected === "전체"
              ? "border-b-2 border-custom-blue-500 text-black"
              : "border-b-2 border-[#EEEEEE] text-[#ABABAB]"
          }`}
          onClick={() => handleSelect("전체")}
        >
          전체
        </button>

        <div className="relative flex-1">
          <button
            type="button"
            className={`w-full p-2 text-base font-pretendard-semibold ${
              selected === "전체"
                ? "border-b-2 border-[#EEEEEE] text-[#ABABAB]"
                : "border-b-2 border-custom-blue-500 text-black"
            }`}
            onClick={() => setIsShowOptions(!isShowOptions)}
          >
            {selected === "전체" ? lastSelected : selected}{" "}
            {/* selected가 "전체"인 경우에는 lastSelected 값을 표시하고, 그렇지 않은 경우에는 selected 값을 표시 */}
            <ImageWrapper src="/icons/ToggleIcon.png" />
          </button>
          {isShowOptions && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md">
              {facultys.map(faculty => (
                <button
                  key={faculty}
                  type="button"
                  className="w-full p-2 text-left hover:bg-gray-100"
                  onClick={() => handleSelect(faculty)}
                >
                  {faculty}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionNavBar;
