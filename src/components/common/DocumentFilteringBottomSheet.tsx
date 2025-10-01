import * as React from "react";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentFilteringOpen } from "@/global/store/bottomSheetSlice";
import { RootState } from "@/global/store";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";
import { DocumentType, documentTypeLabels } from "@/types/api/constants/documentType";
import IconWrapper21x21 from "./IconWrapper21x21";
import FilteringButton from "./buttons/FilteringButton";
import DocumentFilteringTag from "./tags/DocumentFilteringTag";

interface DocumentFilteringBottomSheetProps {
  onReset: () => void;
  onConfirm: (filters: Partial<DocumentCommand>) => void;
  trigger: React.ReactNode;
  currentFiltering: Partial<DocumentCommand>;
}

const SORT_OPTIONS = [
  { value: "LATEST" as SortType, label: sortTypeLabels.LATEST },
  { value: "MOST_LIKED" as SortType, label: sortTypeLabels.MOST_LIKED },
  { value: "VIEW_COUNT" as SortType, label: sortTypeLabels.VIEW_COUNT },
];

const DOCUMENT_TYPE_OPTIONS = [
  { value: "DOCUMENT" as DocumentType, label: documentTypeLabels.DOCUMENT },
  { value: "PAST_EXAM" as DocumentType, label: documentTypeLabels.PAST_EXAM },
  { value: "SOLUTION" as DocumentType, label: documentTypeLabels.SOLUTION },
];

export default function DocumentFilteringBottomSheet({
  onReset,
  onConfirm,
  trigger,
  currentFiltering,
}: DocumentFilteringBottomSheetProps) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.bottomSheet.documentFilteringOpen);

  // 로컬 상태
  const [selectedSort, setSelectedSort] = useState<SortType | undefined>(currentFiltering.sortType);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState<string[]>([]);

  // 초기화 함수
  const handleReset = () => {
    setSelectedSort(undefined);
    setSelectedDocumentTypes([]);
    onReset();
  };

  // 바텀시트 닫는 함수
  const handleClose = () => dispatch(setDocumentFilteringOpen(false));

  // 확인 함수: 필터링 조건을 부모에게 전달
  const handleConfirm = () => {
    const filtering: Partial<DocumentCommand> = {
      sortType: selectedSort,
      // @ts-ignore: DocumentType과 string 간의 타입 불일치 무시
      documentTypes: selectedDocumentTypes,
    };

    onConfirm(filtering);
    dispatch(setDocumentFilteringOpen(false));
  };

  const handleSortChange = (sortType: SortType) => {
    setSelectedSort(sortType);
  };

  const handleDocumentTypeToggle = (documentType: string) => {
    let newDocumentTypes: string[];

    if (selectedDocumentTypes.includes(documentType)) {
      newDocumentTypes = selectedDocumentTypes.filter(t => t !== documentType);
    } else if (selectedDocumentTypes.length < 2) {
      newDocumentTypes = [...selectedDocumentTypes, documentType];
    } else {
      newDocumentTypes = selectedDocumentTypes; // 최대 2개 제한
    }

    setSelectedDocumentTypes(newDocumentTypes);
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => dispatch(setDocumentFilteringOpen(open))}>
      {/* BottomSheet 열 트리거 */}
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent className="mx-auto flex max-h-[80vh] w-full max-w-[640px] flex-col rounded-t-[30px] p-0">
        {/* 헤더: 필터링, X버튼 */}
        <DrawerHeader className="sticky top-0 flex flex-row items-center justify-between rounded-t-[30px] border-b-2 border-[#F3F3F3] px-[30px] pb-[26px] pt-[10px]">
          <DrawerTitle className="font-suit-semibold text-[18px]">자료게시판 필터링</DrawerTitle>
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
                  <DocumentFilteringTag
                    key={option.value}
                    label={option.label}
                    isSelected={selectedSort === option.value}
                    onClick={() => handleSortChange(option.value)}
                  />
                ))}
              </div>
            </div>

            {/* 자료 유형 선택 섹션 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                자료 유형 <span className="text-sm text-gray-500">최대 2개</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {DOCUMENT_TYPE_OPTIONS.map(option => (
                  <DocumentFilteringTag
                    key={option.value}
                    label={option.label}
                    isSelected={selectedDocumentTypes.includes(option.value)}
                    onClick={() => handleDocumentTypeToggle(option.value)}
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
            <FilteringButton type="submit" onClick={handleConfirm} activeColor="#00D1F2" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
