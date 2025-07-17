import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";
import { chaetaekStatusLabels } from "@/types/api/constants/chaetaekStatus";
import { QuestionPresetTagLabels } from "@/types/api/constants/questionPresetTag";
import Image from "next/image";

interface ActiveQuestionFiltersProps {
  currentFiltering: Partial<QuestionCommand>;
  onReset: () => void;
  onRemoveFilter: (filterType: "sortType" | "chaetaekStatus" | "tag", value?: string) => void;
}

export default function ActiveQuestionFilters({
  currentFiltering,
  onReset,
  onRemoveFilter,
}: ActiveQuestionFiltersProps) {
  return (
    <>
      {/* 현재 적용된 필터 태그 모음 */}
      <div className="mb-6 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide" aria-label="active-filters">
        {/* 초기화 버튼 */}
        <div
          className="font-suit-medium flex shrink-0 cursor-pointer items-center rounded-full bg-question-main px-3 py-2 text-[12px] text-white hover:opacity-90"
          role="button"
          tabIndex={0}
          onClick={onReset}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") onReset();
          }}
        >
          <Image src="/icons/reset.svg" className="mr-1" alt="초기화" width={16} height={16} />
          초기화
        </div>

        {/* 정렬 */}
        {currentFiltering.sortType && (
          <div
            className="font-suit-bold flex shrink-0 cursor-pointer items-center rounded-full border-[1px] border-question-main bg-white px-3 py-2 text-[12px] text-question-main hover:bg-gray-50"
            role="button"
            tabIndex={0}
            onClick={() => onRemoveFilter("sortType")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") onRemoveFilter("sortType");
            }}
          >
            <Image
              src="/icons/interface-delete-circle--button-delete-remove-add-circle-buttons--Streamline-Core.svg"
              className="mr-1"
              alt="삭제"
              width={16}
              height={16}
            />
            {sortTypeLabels[currentFiltering.sortType as SortType]}
          </div>
        )}

        {/* 채택 여부  */}
        {currentFiltering.chaetaekStatus && (
          <div
            className="font-suit-bold flex shrink-0 cursor-pointer items-center rounded-full border-[1px] border-question-main bg-white px-3 py-2 text-[12px] text-question-main hover:bg-gray-50"
            role="button"
            tabIndex={0}
            onClick={() => onRemoveFilter("chaetaekStatus")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") onRemoveFilter("chaetaekStatus");
            }}
          >
            <Image
              src="/icons/interface-delete-circle--button-delete-remove-add-circle-buttons--Streamline-Core.svg"
              className="mr-1"
              alt="삭제"
              width={16}
              height={16}
            />
            {chaetaekStatusLabels[currentFiltering.chaetaekStatus]}
          </div>
        )}

        {/* 지정 태그 */}
        {currentFiltering.questionPresetTags &&
          currentFiltering.questionPresetTags.map(tag => (
            <div
              key={tag}
              className="font-suit-bold flex shrink-0 cursor-pointer items-center rounded-full border-[1px] border-question-main bg-white px-3 py-2 text-[12px] text-question-main hover:bg-gray-50"
              role="button"
              tabIndex={0}
              onClick={() => onRemoveFilter("tag", tag)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") onRemoveFilter("tag", tag);
              }}
            >
              <Image
                src="/icons/interface-delete-circle--button-delete-remove-add-circle-buttons--Streamline-Core.svg"
                className="mr-1"
                alt="삭제"
                width={16}
                height={16}
              />
              {QuestionPresetTagLabels[tag]}
            </div>
          ))}
      </div>
    </>
  );
}
