// import { useState } from "react";
// import Image from "next/image";
// import { QnaFilterOptions } from "@/types/QnaFilterOptions";
// import QnaFilterOptionsModal from "./QnaFilterOptionsModal";
// import JiJeongTag from "../tags/JiJeongTag";

// interface FilterControlBarProps {
//   filterOptions: QnaFilterOptions; // 초기 필터 옵션
//   onFilterChange: (newFilterOptions: QnaFilterOptions) => void; // 필터 변경 시 호출되는 함수
// }

// function QnaFilterControlBar({ filterOptions, onFilterChange }: FilterControlBarProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="flex justify-between px-5 py-3">
//       {/* <div className="flex flex-wrap justify-start"> */}
//       <div className="scrollbar-hide flex overflow-x-auto whitespace-nowrap">
//         {filterOptions.sortOption && (
//           <JiJeongTag
//             key={filterOptions.sortOption}
//             label={filterOptions.sortOption}
//             style={{
//               backgroundColor: "#74D7CB",
//             }}
//           />
//         )}
//         {filterOptions.isChaeTaek && (
//           <JiJeongTag
//             key={filterOptions.isChaeTaek}
//             label={filterOptions.isChaeTaek}
//             style={{
//               backgroundColor: "#0062D2",
//             }}
//           />
//         )}
//         {filterOptions.tags.length > 0 && filterOptions.tags.map(tag => <JiJeongTag key={tag} label={tag} />)}{" "}
//       </div>
//       {/* </div> */}

//       <div className="flex items-center">
//         <Image
//           src="/icons/FilterIcon.svg"
//           alt="filter"
//           width={16}
//           height={16}
//           onClick={openModal}
//           className="ml-1.5 cursor-pointer"
//         />
//       </div>
//       {isModalOpen && (
//         <QnaFilterOptionsModal
//           isVisible={isModalOpen}
//           onClose={closeModal}
//           initialFilterOptions={filterOptions}
//           onApplyFilter={newFilterOptions => {
//             onFilterChange(newFilterOptions);
//             closeModal();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default QnaFilterControlBar;
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

  // 태그 삭제 처리
  const handleRemoveTag = (tag: string) => {
    const newTags = filterOptions.tags.filter(item => item !== tag); // 해당 태그를 제거한 새 배열 생성
    onFilterChange({ ...filterOptions, tags: newTags }); // 부모 컴포넌트에 반영
  };

  // 정렬 옵션 삭제 처리
  const handleRemoveSortOption = () => {
    onFilterChange({ ...filterOptions, sortOption: "" });
  };

  // 채택 상태 삭제 처리
  const handleRemoveChaeTaek = () => {
    onFilterChange({ ...filterOptions, isChaeTaek: "" });
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="scrollbar-hide flex overflow-x-auto whitespace-nowrap">
        {filterOptions.sortOption && (
          <JiJeongTag
            key={filterOptions.sortOption}
            label={`${filterOptions.sortOption} ×`}
            onClick={handleRemoveSortOption} // 정렬 옵션 삭제
            style={{
              backgroundColor: "#74D7CB",
              cursor: "pointer",
            }}
          />
        )}
        {filterOptions.isChaeTaek === "채택됨" && (
          <JiJeongTag
            key="isChaeTaek"
            label={`${filterOptions.isChaeTaek} ×`} // 값에 따라 "채택 ×" 표시
            onClick={handleRemoveChaeTaek} // 채택 상태 삭제
            style={{
              backgroundColor: "#0062D2",
              cursor: "pointer",
            }}
          />
        )}
        {filterOptions.isChaeTaek === "미채택" && (
          <JiJeongTag
            key="isChaeTaek"
            label={`${filterOptions.isChaeTaek} ×`} // 값에 따라 "미채택 ×" 표시
            onClick={handleRemoveChaeTaek} // 채택 상태 삭제
            style={{
              backgroundColor: "#F46B02",
              cursor: "pointer",
            }}
          />
        )}
        {filterOptions.tags.map(tag => (
          <JiJeongTag
            key={tag}
            label={`${tag} ×`}
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
          width={16}
          height={16}
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
