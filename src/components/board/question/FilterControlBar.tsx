import { useState } from "react";
import Image from "next/image";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import ToggleSwitch from "./ToggleSwitch";
import QnaFilterOptionsModal from "./QnaFilterOptionsModal";

interface FilterControlBarProps {
  filterOptions: QnaFilterOptions; // 초기 필터 옵션
  isChaeTak: boolean; // 채택 참/거짓
  onFilterChange: (newFilterOptions: QnaFilterOptions) => void; // 필터 변경 시 호출되는 함수
  onChaeTakChange: (newIsChaeTak: boolean) => void; // 채택 변경 시 호출되는 함수
}

function FilterControlBar({ filterOptions, isChaeTak, onFilterChange, onChaeTakChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSwitch = () => onChaeTakChange(!isChaeTak);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-end px-5 py-4">
      <ToggleSwitch isChaeTak={isChaeTak} toggleSwitch={toggleSwitch} />
      <span className="font-pretendard-semibold mr-2.5 text-xs text-[#737373]">채택됨</span>
      <Image
        src="/icons/FilterIcon.svg"
        alt="filter"
        width={16}
        height={16}
        onClick={openModal}
        style={{ cursor: "pointer" }}
      />
      {isModalOpen && (
        <QnaFilterOptionsModal
          isVisible={isModalOpen}
          onClose={closeModal}
          initialFilterOptions={filterOptions}
          onApplyFilter={newFilterOptions => {
            onFilterChange(newFilterOptions);
            closeModal();
          }}
        />
      )}
    </div>
  );
}

export default FilterControlBar;
