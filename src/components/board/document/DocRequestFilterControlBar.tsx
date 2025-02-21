import { useState } from "react";
import Image from "next/image";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import { DocTypes, DocTypesKey } from "@/lib/constants/docTypes";
import { sortTypeLabels } from "@/lib/constants/sortTypes";
import FacultyTag from "@/components/common/tags/FacultyTag";
import DocRequestFilterOptionsModal from "./DocRequestFilterOptionsModal";
import JiJeongTag from "../tags/JiJeongTag";

interface RequestFilterControlBarProps {
  filterOptions: DocFilterOptions; // 초기 필터 옵션
  onFilterChange: (newFilterOptions: DocFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function DocRequestFilterControlBar({ filterOptions, onFilterChange }: RequestFilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: DocTypesKey) => {
    const updatedTags = filterOptions.docTypes.filter(tag => tag !== tagToRemove);
    onFilterChange({ ...filterOptions, docTypes: updatedTags });
  };

  const handleRemoveSortOption = () => {
    onFilterChange({ ...filterOptions, sortType: undefined });
  };

  const handleRemoveFaculty = () => {
    onFilterChange({ ...filterOptions, faculty: "" });
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* 필터링바에 sortType 표시. null이 아닐 경우만. null은 sortType 선택안됨을 의미 */}
        {filterOptions.sortType && (
          <JiJeongTag
            key={filterOptions.sortType}
            label={`${sortTypeLabels[filterOptions.sortType]} ×`}
            onClick={handleRemoveSortOption}
            style={{
              backgroundColor: "#74D7CB",
              cursor: "pointer",
            }}
          />
        )}
        {/* 학과 옵션 */}
        {filterOptions.faculty && <FacultyTag title={`${filterOptions.faculty} ×`} onClick={handleRemoveFaculty} />}
        {/* 필터링바에 docType 표시 */}
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
      <div className="ml-1.5 flex items-center">
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
        <DocRequestFilterOptionsModal
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

export default DocRequestFilterControlBar;
