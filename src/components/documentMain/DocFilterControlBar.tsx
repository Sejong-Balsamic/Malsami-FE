import { useState } from "react";
import Image from "next/image";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import { DocTypes, DocTypesKey } from "@/types/docTypes";
import { sortTypeLabels } from "@/types/api/constants/sortTypes";
import JiJeongTag from "@/components/common/tags/JiJeongTag";
import DocFilterOptionsModal from "./DocFilterOptionsModal";

interface FilterControlBarProps {
  filterOptions: DocFilterOptions; // 초기 필터 옵션
  onFilterChange: (newFilterOptions: DocFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function DocFilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: DocTypesKey) => {
    const updatedTags = filterOptions.docTypes.filter(tag => tag !== tagToRemove); // 해당 태그를 제거한 새 배열 생성
    onFilterChange({ ...filterOptions, docTypes: updatedTags }); // 부모 컴포넌트에 반영
  };

  const handleRemoveSortOption = () => {
    onFilterChange({ ...filterOptions, sortType: undefined });
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="flex overflow-x-auto scrollbar-hide">
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
        {/* 필터링바에 docType 표시 */}
        {filterOptions.docTypes.length > 0 &&
          filterOptions.docTypes.map(docTypesTag => (
            <JiJeongTag
              key={docTypesTag}
              label={`${DocTypes[docTypesTag]} x`}
              onClick={() => handleRemoveTag(docTypesTag)}
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
