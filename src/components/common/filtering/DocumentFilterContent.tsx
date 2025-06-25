import React, { useState } from "react";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";
import FilteringTag from "../tags/FilteringTag";

interface DocumentFilterContentProps {
  onFilterChange: (filters: Partial<DocumentCommand>) => void;
  currentFilters: Partial<DocumentCommand>;
}

const SORT_OPTIONS = [
  { value: "LATEST" as SortType, label: sortTypeLabels.LATEST },
  { value: "OLDEST" as SortType, label: sortTypeLabels.OLDEST },
  { value: "MOST_LIKED" as SortType, label: sortTypeLabels.MOST_LIKED },
  { value: "VIEW_COUNT" as SortType, label: sortTypeLabels.VIEW_COUNT },
  { value: "COMMENT_COUNT" as SortType, label: sortTypeLabels.COMMENT_COUNT },
  { value: "DOWNLOAD_COUNT" as SortType, label: sortTypeLabels.DOWNLOAD_COUNT },
];

const TAG_OPTIONS = ["개념 모음", "공부 팁", "더 나은 풀이", "수업 외 내용", "시험 대비", "자료 요청", "조언 구함"];

export default function DocumentFilterContent({ onFilterChange, currentFilters }: DocumentFilterContentProps) {
  const [selectedSort, setSelectedSort] = useState<SortType | undefined>(currentFilters.sortType);
  const [selectedTags, setSelectedTags] = useState<string[]>(currentFilters.customTags || []);

  const handleSortChange = (sortType: SortType) => {
    setSelectedSort(sortType);
    onFilterChange({ ...currentFilters, sortType });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];

    setSelectedTags(newTags);
    onFilterChange({ ...currentFilters, customTags: newTags });
  };

  return (
    <div className="space-y-6">
      {/* 정렬 섹션 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">정렬</h3>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map(option => (
            <FilteringTag
              key={option.value}
              label={option.label}
              isSelected={selectedSort === option.value}
              onClick={() => handleSortChange(option.value)}
            />
          ))}
        </div>
      </div>

      {/* 태그 선택 섹션 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">
          태그 선택 <span className="text-sm text-gray-500">최대 2개</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map(tag => (
            <FilteringTag
              key={tag}
              label={tag}
              isSelected={selectedTags.includes(tag)}
              onClick={() => handleTagToggle(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
