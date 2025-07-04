/* eslint-disable */

import React, { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import { DocTypesKeys, DocTypes } from "@/types/docTypes";
import { SortType, sortTypeLabels } from "@/types/api/constants/sortType";

interface DocFilterOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialFilterOptions: DocFilterOptions;
  onApplyFilter: (filters: DocFilterOptions) => void;
  children?: ReactNode;
}

// SortType의 키 배열을 상수로 정의
const SORT_TYPE_KEYS = Object.keys(sortTypeLabels) as SortType[];

const DocFilterOptionsModal: React.FC<DocFilterOptionsModalProps> = ({
  isVisible,
  onClose,
  initialFilterOptions,
  onApplyFilter,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState("50vh");
  const contentRef = useRef<HTMLDivElement>(null);

  const [docTypes, setDocTypes] = useState(initialFilterOptions.docTypes);
  const [sortType, setSortType] = useState(initialFilterOptions.sortType);

  const handleApply = () => {
    onApplyFilter({ docTypes, sortType });
  };

  const resetFilters = () => {
    setDocTypes([]);
    setSortType(undefined);
  };

  if (!isVisible) return null;

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setShowModal(false), 300);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const scrollThreshold = 30;
      if (content.scrollTop > scrollThreshold && modalHeight === "50vh") {
        setModalHeight("75vh");
      }
    }
  };

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 z-30 flex items-end justify-center transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div
            className="relative mx-auto w-full min-w-[386px] max-w-[640px] transform rounded-t-[20px] bg-white px-[18px] pb-4 pt-8 shadow-lg transition-transform duration-300"
            style={{
              maxHeight: modalHeight,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.5s ease-out, max-height 0.5s ease",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-[30px] top-[38px]">
              <Image src="/icons/CloseIcon.svg" alt="Close" width={20} height={20} />
            </button>
            <div
              className="overflow-y-auto"
              style={{
                height: `calc(${modalHeight} - 72px)`,
                paddingBottom: "70px",
              }}
              onScroll={handleScroll}
              ref={contentRef}
            >
              <>
                <h1 className="font-pretendard-bold mb-[20px] text-xl">정렬</h1>
                <div className="mb-[30px] flex flex-col">
                  {SORT_TYPE_KEYS.map(docSortType => (
                    <li key={docSortType} className="flex rounded-xl py-[10px]">
                      <div
                        className="flex w-full cursor-pointer flex-row justify-between"
                        onClick={() => setSortType(docSortType)}
                        onKeyDown={e => e.key === "Enter" && setSortType(docSortType)}
                      >
                        {sortType === docSortType ? (
                          <span className="font-pretendard-bold text-custom-blue-500 text-base">
                            {sortTypeLabels[docSortType]}
                          </span>
                        ) : (
                          <span className="font-pretendard-medium text-base">{sortTypeLabels[docSortType]}</span>
                        )}
                        {sortType === docSortType ? (
                          <Image src="/icons/CheckedIcon.svg" alt="CheckedIcon" width={14} height={14} />
                        ) : (
                          <Image src="/icons/UnCheckedIcon.svg" alt="UnCheckedIcon" width={14} height={14} />
                        )}
                      </div>
                    </li>
                  ))}
                </div>

                <h1 className="font-pretendard-bold mb-[20px] text-xl">
                  태그 선택 <span className="font-pretendard-medium ml-1.5 text-sm text-[#A4A4A4]">최대 2개</span>
                </h1>
                <div className="mb-[40px] flex flex-wrap justify-between gap-x-[7px] gap-y-[20px]">
                  {DocTypesKeys.map(docTypeKey => (
                    <button
                      key={docTypeKey}
                      onClick={() =>
                        setDocTypes(prevTags =>
                          prevTags.includes(docTypeKey)
                            ? prevTags.filter(t => t !== docTypeKey)
                            : [...prevTags, docTypeKey].slice(0, 2),
                        )
                      }
                      className={`font-pretendard-bold border-custom-blue-500 rounded-[40px] border-2 px-3 py-1 text-xs ${
                        docTypes.includes(docTypeKey) ? "bg-custom-blue-500 text-white" : "text-custom-blue-500"
                      }`}
                    >
                      {DocTypes[docTypeKey]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={resetFilters}
                  className="font-pretendard-medium flex flex-row gap-x-1 text-sm text-[#A4A4A4]"
                >
                  <Image src="/icons/ResetIcon.svg" alt="Reset" width={14} height={17} />
                  <span>초기화</span>
                </button>
              </>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
              <SubmitFormBtn onClick={handleApply} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocFilterOptionsModal;
