import { useState } from "react";
import Image from "next/image";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import DocTypes from "@/lib/constants/docTypes";
import SortTypes from "@/lib/constants/sortTypes";
import DocFilterOptionsModal from "./DocFilterOptionsModal";
import JiJeongTag from "../tags/JiJeongTag";

interface FilterControlBarProps {
  filterOptions: DocFilterOptions; // 초기 필터 옵션
  onFilterChange: (newFilterOptions: DocFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function DocFilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = filterOptions.docTypes.filter(tag => tag !== tagToRemove);
    onFilterChange({ ...filterOptions, docTypes: updatedTags });
  };

  const handleRemoveSortOption = () => {
    onFilterChange({ ...filterOptions, sortType: "" });
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex overflow-x-auto scrollbar-hide">
        {/* 필터링바에 sortType 표시 */}
        {filterOptions.sortType && (
          <JiJeongTag
            key={filterOptions.sortType}
            label={`${SortTypes[filterOptions.sortType as keyof typeof SortTypes]} ×`}
            onClick={handleRemoveSortOption}
            style={{
              backgroundColor: "#74D7CB",
              cursor: "pointer",
            }}
          />
        )}
        {filterOptions.docTypes.length > 0 &&
          filterOptions.docTypes.map(tag => (
            <JiJeongTag
              key={tag}
              label={`${DocTypes[tag as keyof typeof DocTypes]} ×`}
              onClick={() => handleRemoveTag(tag)}
              style={{
                backgroundColor: "#0062D2",
                cursor: "pointer",
              }}
            />
          ))}
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
        <DocFilterOptionsModal
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

export default DocFilterControlBar;
