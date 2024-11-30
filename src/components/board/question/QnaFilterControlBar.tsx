import { useState } from "react";
import Image from "next/image";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import QnaFilterOptionsModal from "./QnaFilterOptionsModal";
import JiJeongTag from "../tags/JiJeongTag";

interface FilterControlBarProps {
  filterOptions: QnaFilterOptions; // 초기 필터 옵션
  onFilterChange: (newFilterOptions: QnaFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function QnaFilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex">
        {filterOptions.sortOption && (
          <JiJeongTag
            key={filterOptions.sortOption}
            label={filterOptions.sortOption}
            style={{
              backgroundColor: "#AAE483",
            }}
          />
        )}
        {filterOptions.isChaeTaek && (
          <JiJeongTag
            key={filterOptions.isChaeTaek}
            label={filterOptions.isChaeTaek}
            style={{
              backgroundColor: "#0062D2",
            }}
          />
        )}
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

export default QnaFilterControlBar;
