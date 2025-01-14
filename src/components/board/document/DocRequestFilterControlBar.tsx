import { useState } from "react";
import Image from "next/image";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import FacultyTag from "@/components/common/tags/facultyTag";
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
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = filterOptions.docTypes.filter(tag => tag !== tagToRemove);
    onFilterChange({ ...filterOptions, docTypes: updatedTags });
  };

  const handleRemoveSortOption = () => {
    onFilterChange({ ...filterOptions, sortType: "" });
  };

  const handleRemoveFaculty = () => {
    onFilterChange({ ...filterOptions, faculty: "" });
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* 정렬 옵션 */}
        {filterOptions.sortType && (
          <JiJeongTag
            key={filterOptions.sortType}
            label={`${filterOptions.sortType} ×`}
            onClick={handleRemoveSortOption}
            style={{
              backgroundColor: "#74D7CB",
              cursor: "pointer",
            }}
          />
        )}
        {/* 학과 옵션 */}
        {filterOptions.faculty && <FacultyTag title={`${filterOptions.faculty} ×`} onClick={handleRemoveFaculty} />}
        {/* 태그 목록 */}
        {filterOptions.docTypes.length > 0 &&
          filterOptions.docTypes.map(tag => (
            <JiJeongTag
              key={tag}
              label={`${tag} ×`}
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
