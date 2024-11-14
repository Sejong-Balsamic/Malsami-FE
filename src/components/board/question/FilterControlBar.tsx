import { useState } from "react";
import Image from "next/image";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import QnaFilterOptionsModal from "./QnaFilterOptionsModal";
import JiJeongTag from "../tags/JiJeongTag";

interface FilterControlBarProps {
  filterOptions: QnaFilterOptions; // 초기 필터 옵션
  onFilterChange: (newFilterOptions: QnaFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function FilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex">
        {filterOptions.tags.length > 0 && filterOptions.tags.map(tag => <JiJeongTag key={tag} label={tag} />)}{" "}
      </div>
      <div className="flex items-center">
        <Image
          src="/icons/FilterIcon.svg"
          alt="filter"
          width={16}
          height={16}
          onClick={openModal}
          style={{ cursor: "pointer" }}
        />
      </div>
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
