import { useState } from "react";
import ImageWrapper from "../tags/ImageWrapper";
import QnaSelectFacultyModal from "./QnaSelectFacultyModal";

function QnaFilterFacultyCategory({ onSelect }: { onSelect: (selection: string) => void }) {
  const [selected, setSelected] = useState("전체");
  const [lastSelected, setLastSelected] = useState("학부 선택"); // 직전 선택한 항목
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (faculty: string) => {
    if (faculty !== "전체") {
      setLastSelected(faculty); // "전체"가 아닌 경우에만 lastSelected를 업데이트
    }
    setSelected(faculty); // 항상 selected는 업데이트
    onSelect(faculty); // 부모 컴포넌트에 option을 전달
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        <button
          type="button"
          className={`w-[50%] p-1 text-lg ${
            selected === "전체"
              ? "border-b-2 border-custom-blue-500 text-black font-pretendard-semibold"
              : "border-b-2 border-[#EEEEEE] text-[#ABABAB] font-pretendard-medium"
          }`}
          onClick={() => handleSelect("전체")}
        >
          전체
        </button>

        <div className="relative flex-1">
          <button
            type="button"
            className={`w-full p-1 text-lg ${
              selected === "전체"
                ? "border-b-2 border-[#EEEEEE] text-[#ABABAB] font-pretendard-medium"
                : "border-b-2 border-custom-blue-500 text-black font-pretendard-semibold"
            }`}
            onClick={() => {
              openModal();
            }}
          >
            {selected === "전체" ? lastSelected : selected}{" "}
            {/* selected가 "전체"인 경우에는 lastSelected 값을 표시하고, 그렇지 않은 경우에는 selected 값을 표시 */}
            <ImageWrapper src="/icons/ToggleIcon.svg" />
          </button>
          <QnaSelectFacultyModal isVisible={isModalOpen} onClose={closeModal} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}

export default QnaFilterFacultyCategory;
