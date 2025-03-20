import { useState } from "react";
import Image from "next/image";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import { QnaPresetTags, QnaPresetTagsKey } from "@/types/qnaPresetTags";
import { ChaetaekStatusKey, ChaetaekStatus } from "@/types/chaetaekStatus";
import { sortTypeLabels } from "@/types/api/constants/sortType";
import JiJeongTag from "@/components/common/tags/JiJeongTag";
import QnaFilterOptionsModal from "./QnaFilterOptionsModal";

interface FilterControlBarProps {
  filterOptions: QnaFilterOptions; // 초기 질문게시판 필터 옵션
  onFilterChange: (newFilterOptions: QnaFilterOptions) => void; // 필터 변경 시 호출되는 함수
}

function QnaFilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 태그 삭제 처리
  const handleRemoveTag = (tag: QnaPresetTagsKey) => {
    const newTags = filterOptions.qnaPresetTags.filter(item => item !== tag); // 해당 태그를 제거한 새 배열 생성
    onFilterChange({ ...filterOptions, qnaPresetTags: newTags }); // 부모 컴포넌트에 반영
  };

  // 정렬 옵션 삭제 처리
  const handleRemoveSortType = () => {
    onFilterChange({ ...filterOptions, sortType: undefined });
  };

  // 채택 상태 삭제 처리
  const handleRemoveChaeTaek = () => {
    onFilterChange({ ...filterOptions, chaetaekStatus: undefined });
  };

  return (
    <div className="flex h-12 justify-between px-5 py-3">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* 필터링바에 sortType 표시. null이 아닐 경우만. null은 sortType 선택안됨을 의미 */}
        {filterOptions.sortType && (
          <JiJeongTag
            key={filterOptions.sortType}
            label={`${sortTypeLabels[filterOptions.sortType]} ×`}
            onClick={handleRemoveSortType}
            style={{ backgroundColor: "#74D7CB", cursor: "pointer" }}
          />
        )}

        {/* 필터링바에 채택여부 표시. 채택됨, 미채택만 표시 */}
        {["CHAETAEK", "NO_CHAETAEK"].includes(filterOptions.chaetaekStatus as ChaetaekStatusKey) && (
          <JiJeongTag
            key="chaetaekStatus"
            label={`${ChaetaekStatus[filterOptions.chaetaekStatus as ChaetaekStatusKey]} ×`} // 값에 따라 "채택 ×" 또는 "미채택 ×" 표시
            onClick={handleRemoveChaeTaek} // 채택 상태 삭제
            style={{
              backgroundColor: filterOptions.chaetaekStatus === "CHAETAEK" ? "#0062D2" : "#F46B02", // 색상 동적으로 변경
              cursor: "pointer",
            }}
          />
        )}

        {/* 필터링바에 질문태그 표시 */}
        {filterOptions.qnaPresetTags.map(tag => (
          <JiJeongTag
            key={tag}
            label={`${QnaPresetTags[tag as keyof typeof QnaPresetTags]} ×`}
            onClick={() => handleRemoveTag(tag)} // 태그 삭제
            style={{
              backgroundColor: "#58C4AE",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div className="flex items-center">
        <Image
          src="/icons/FilterIcon.svg"
          alt="filter"
          width={18}
          height={18}
          onClick={openModal}
          className="ml-1.5 cursor-pointer"
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
