import React, { useState } from "react";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";
import { ChaetaekStatus } from "@/types/api/constants/chaetaekStatus";
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";
import FilteringTag from "../tags/FilteringTag";

interface QuestionFilterContentProps {
  onFilterChange: (filters: Partial<QuestionCommand>) => void;
  currentFilters: Partial<QuestionCommand>;
}

const SORT_OPTIONS = [
  { value: "LATEST" as SortType, label: sortTypeLabels.LATEST },
  { value: "OLDEST" as SortType, label: sortTypeLabels.OLDEST },
  { value: "MOST_LIKED" as SortType, label: sortTypeLabels.MOST_LIKED },
  { value: "REWARD_YEOPJEON" as SortType, label: sortTypeLabels.REWARD_YEOPJEON },
  { value: "VIEW_COUNT" as SortType, label: sortTypeLabels.VIEW_COUNT },
  { value: "COMMENT_COUNT" as SortType, label: sortTypeLabels.COMMENT_COUNT },
];

const CHAETAEK_OPTIONS = [
  { value: "ALL" as ChaetaekStatus, label: "전체" },
  { value: "CHAETAEK" as ChaetaekStatus, label: "채택완료" },
  { value: "NO_CHAETAEK" as ChaetaekStatus, label: "채택대기" },
];

const QUESTION_TAG_OPTIONS = [
  { value: "OUT_OF_CLASS" as QuestionPresetTag, label: "수업 외 내용" },
  { value: "UNKNOWN_CONCEPT" as QuestionPresetTag, label: "개념 모름" },
  { value: "BETTER_SOLUTION" as QuestionPresetTag, label: "더 나은 풀이" },
  { value: "EXAM_PREPARATION" as QuestionPresetTag, label: "시험 대비" },
  { value: "DOCUMENT_REQUEST" as QuestionPresetTag, label: "자료 요청" },
  { value: "STUDY_TIPS" as QuestionPresetTag, label: "공부 팁" },
  { value: "ADVICE_REQUEST" as QuestionPresetTag, label: "조언 구함" },
];

export default function QuestionFilterContent({ onFilterChange, currentFilters }: QuestionFilterContentProps) {
  const [selectedSort, setSelectedSort] = useState<SortType | undefined>(currentFilters.sortType);
  const [selectedChaetaek, setSelectedChaetaek] = useState<ChaetaekStatus | undefined>(currentFilters.chaetaekStatus);
  const [selectedTags, setSelectedTags] = useState<QuestionPresetTag[]>(currentFilters.questionPresetTags || []);

  const handleSortChange = (sortType: SortType) => {
    setSelectedSort(sortType);
    onFilterChange({ ...currentFilters, sortType });
  };

  const handleChaetaekChange = (chaetaekStatus: ChaetaekStatus) => {
    setSelectedChaetaek(chaetaekStatus);
    onFilterChange({ ...currentFilters, chaetaekStatus });
  };

  const handleTagToggle = (tag: QuestionPresetTag) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];

    setSelectedTags(newTags);
    onFilterChange({ ...currentFilters, questionPresetTags: newTags });
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

      {/* 채택 여부 섹션 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">채택 여부</h3>
        <div className="flex flex-wrap gap-2">
          {CHAETAEK_OPTIONS.map(option => (
            <FilteringTag
              key={option.value}
              label={option.label}
              isSelected={selectedChaetaek === option.value}
              onClick={() => handleChaetaekChange(option.value)}
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
          {QUESTION_TAG_OPTIONS.map(option => (
            <FilteringTag
              key={option.value}
              label={option.label}
              isSelected={selectedTags.includes(option.value)}
              onClick={() => handleTagToggle(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
