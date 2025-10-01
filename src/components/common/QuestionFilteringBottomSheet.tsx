import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionFilteringOpen } from "@/global/store/bottomSheetSlice";
import { RootState } from "@/global/store";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";
import { ChaetaekStatus, chaetaekStatusLabels } from "@/types/api/constants/chaetaekStatus";
import { QuestionPresetTag, QuestionPresetTagLabels } from "@/types/api/constants/questionPresetTag";
import IconWrapper21x21 from "./IconWrapper21x21";
import FilteringButton from "./buttons/FilteringButton";
import QuestionFilteringTag from "./tags/QuestionFilteringTag";

interface QuestionFilteringBottomSheetProps {
  onReset: () => void;
  onConfirm: (filters: Partial<QuestionCommand>) => void;
  trigger: React.ReactNode;
  currentFiltering: Partial<QuestionCommand>;
}

const SORT_OPTIONS = [
  { value: "LATEST" as SortType, label: sortTypeLabels.LATEST },
  { value: "MOST_LIKED" as SortType, label: sortTypeLabels.MOST_LIKED },
  { value: "REWARD_YEOPJEON_DESCENDING" as SortType, label: sortTypeLabels.REWARD_YEOPJEON_DESCENDING },
  { value: "REWARD_YEOPJEON_LATEST" as SortType, label: sortTypeLabels.REWARD_YEOPJEON_LATEST },
  { value: "VIEW_COUNT" as SortType, label: sortTypeLabels.VIEW_COUNT },
];

const CHAETAEK_OPTIONS = [
  { value: "ALL" as ChaetaekStatus, label: chaetaekStatusLabels.ALL },
  { value: "CHAETAEK" as ChaetaekStatus, label: chaetaekStatusLabels.CHAETAEK },
  { value: "NO_CHAETAEK" as ChaetaekStatus, label: chaetaekStatusLabels.NO_CHAETAEK },
];

const QUESTION_TAG_OPTIONS = [
  { value: "OUT_OF_CLASS" as QuestionPresetTag, label: QuestionPresetTagLabels.OUT_OF_CLASS },
  { value: "UNKNOWN_CONCEPT" as QuestionPresetTag, label: QuestionPresetTagLabels.UNKNOWN_CONCEPT },
  { value: "BETTER_SOLUTION" as QuestionPresetTag, label: QuestionPresetTagLabels.BETTER_SOLUTION },
  { value: "EXAM_PREPARATION" as QuestionPresetTag, label: QuestionPresetTagLabels.EXAM_PREPARATION },
  { value: "DOCUMENT_REQUEST" as QuestionPresetTag, label: QuestionPresetTagLabels.DOCUMENT_REQUEST },
  { value: "STUDY_TIPS" as QuestionPresetTag, label: QuestionPresetTagLabels.STUDY_TIPS },
  { value: "ADVICE_REQUEST" as QuestionPresetTag, label: QuestionPresetTagLabels.ADVICE_REQUEST },
];

export default function QuestionFilteringBottomSheet({
  onReset,
  onConfirm,
  trigger,
  currentFiltering,
}: QuestionFilteringBottomSheetProps) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.bottomSheet.questionFilteringOpen);

  // 로컬 상태
  const [selectedSort, setSelectedSort] = useState<SortType | undefined>(currentFiltering.sortType);
  const [selectedChaetaek, setSelectedChaetaek] = useState<ChaetaekStatus | undefined>(currentFiltering.chaetaekStatus);
  const [selectedTags, setSelectedTags] = useState<QuestionPresetTag[]>(currentFiltering.questionPresetTags || []);

  // currentFiltering 변경 시 내부 상태 동기화
  useEffect(() => {
    setSelectedSort(currentFiltering.sortType);
    setSelectedChaetaek(currentFiltering.chaetaekStatus);
    setSelectedTags(currentFiltering.questionPresetTags || []);
  }, [currentFiltering]);

  // 초기화 함수
  const handleReset = () => {
    setSelectedSort(undefined);
    setSelectedChaetaek(undefined);
    setSelectedTags([]);
    onReset();
  };

  // 바텀시트 닫는 함수
  const handleClose = () => dispatch(setQuestionFilteringOpen(false));

  // 확인 함수: 필터링 조건을 부모에게 전달
  const handleConfirm = () => {
    const filtering: Partial<QuestionCommand> = {
      sortType: selectedSort,
      chaetaekStatus: selectedChaetaek,
      questionPresetTags: selectedTags,
    };

    onConfirm(filtering);
    dispatch(setQuestionFilteringOpen(false));
  };

  const handleSortChange = (sortType: SortType) => {
    setSelectedSort(sortType);
  };

  const handleChaetaekChange = (chaetaekStatus: ChaetaekStatus) => {
    setSelectedChaetaek(chaetaekStatus);
  };

  const handleTagToggle = (tag: QuestionPresetTag) => {
    let newTags: QuestionPresetTag[];

    if (selectedTags.includes(tag)) {
      newTags = selectedTags.filter(t => t !== tag);
    } else if (selectedTags.length < 2) {
      newTags = [...selectedTags, tag];
    } else {
      newTags = selectedTags; // 최대 2개 제한
    }

    setSelectedTags(newTags);
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => dispatch(setQuestionFilteringOpen(open))}>
      {/* BottomSheet 열 트리거 */}
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent className="mx-auto flex max-h-[80vh] w-full max-w-[640px] flex-col rounded-t-[30px] p-0">
        {/* 헤더: 필터링, X버튼 */}
        <DrawerHeader className="sticky top-0 flex flex-row items-center justify-between rounded-t-[30px] border-b-2 border-ui-divider-thick px-[30px] pb-[26px] pt-[10px]">
          <DrawerTitle className="font-suit-semibold text-[18px]">질문게시판 필터링</DrawerTitle>
          <DrawerClose onClick={handleClose}>
            <IconWrapper21x21 src="/icons/x-lg.svg" />
          </DrawerClose>
        </DrawerHeader>

        {/* 메인내용: 필터링 옵션들 */}
        <div className="overflow-y-auto px-[30px] pt-[26px]">
          <div className="space-y-6">
            {/* 정렬 섹션 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">정렬</h3>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map(option => (
                  <QuestionFilteringTag
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
                  <QuestionFilteringTag
                    key={option.value}
                    label={option.label}
                    isSelected={selectedChaetaek === option.value}
                    onClick={() => handleChaetaekChange(option.value)}
                  />
                ))}
              </div>
            </div>

            {/* 정적 태그 선택 섹션 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                정적 태그 <span className="text-sm text-gray-500">최대 2개</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {QUESTION_TAG_OPTIONS.map(option => (
                  <QuestionFilteringTag
                    key={option.value}
                    label={option.label}
                    isSelected={selectedTags.includes(option.value)}
                    onClick={() => handleTagToggle(option.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 초기화 버튼, 확인 버튼 */}
        <div className="sticky bottom-0 flex gap-1 p-6">
          <div className="flex-[1]">
            <FilteringButton type="refresh" onClick={handleReset} />
          </div>
          <div className="flex-[2.5]">
            <FilteringButton type="submit" onClick={handleConfirm} activeColor="#00E271" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
