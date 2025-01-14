/* eslint-disable */

import React, { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import DocTypes from "@/lib/constants/docTypes";
import DocSortTypeKeys from "@/lib/constants/partial/docSortTypeKeys";
import SortTypes from "@/lib/constants/sortTypes";
import { DocFilterOptions } from "@/types/DocFilterOptions";

interface DocFilterOptionsModalProps {
  isVisible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달을 닫는 함수
  initialFilterOptions: DocFilterOptions; // 필터 옵션의 초기값
  onApplyFilter: (filters: DocFilterOptions) => void; // 필터 적용 함수
  children?: ReactNode; // 모달 내용으로 표시할 컴포넌트나 요소들
}

const DocFilterOptionsModal: React.FC<DocFilterOptionsModalProps> = ({
  isVisible,
  onClose,
  initialFilterOptions,
  onApplyFilter,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState("50vh"); // 초기 modalHeight 50%로 설정
  const contentRef = useRef<HTMLDivElement>(null);

  const [docTypes, setDocTypes] = useState(initialFilterOptions.docTypes);
  const [sortType, setSortType] = useState(initialFilterOptions.sortType);

  const handleApply = () => {
    onApplyFilter({ docTypes, sortType });
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setDocTypes([]);
    setSortType("");
  };

  if (!isVisible) return null;

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      document.body.style.overflow = "hidden"; // 배경 스크롤 비활성화
    } else {
      setTimeout(() => setShowModal(false), 300); // 애니메이션 후 숨김 처리
      document.body.style.overflow = ""; // 스크롤 복구
    }
    return () => {
      document.body.style.overflow = ""; // 모달이 사라질 때 스크롤 복구
    };
  }, [isVisible]);

  // 스크롤 하면 모달 창 크게하는 함수 (height 50% -> 75%로)
  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const scrollThreshold = 30; // 스크롤이 30px 이상 내려가면 모달 크기를 확장
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
          {/* 반투명한 배경 오버레이 */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

          {/* 모달 컨텐츠 */}
          {/* 스크롤바 없애기 */}
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
              transition: "transform 0.5s ease-out, max-height 0.5s ease", // transform에 대한 트랜지션 추가
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute right-[30px] top-[38px]">
              <Image src="/icons/CloseIcon.svg" alt="Close" width={20} height={20} />
            </button>

            {/* 모달 스크롤 가능한 컨텐츠 */}
            <div
              className="overflow-y-auto"
              style={{
                height: `calc(${modalHeight} - 72px)`, // 72px 하단영역을 제외한 높이 설정
                paddingBottom: "70px",
              }}
              onScroll={handleScroll}
              ref={contentRef}
            >
              <>
                <h1 className="font-pretendard-bold mb-[20px] text-xl">정렬</h1>
                <div className="mb-[30px] flex flex-col">
                  {/* DocSortTypeKeys가 객체이므로 Object.keys로 key배열 생성 */}
                  {Object.keys(DocSortTypeKeys).map(docSortTypeKey => (
                    <li key={docSortTypeKey} className="flex rounded-xl py-[10px]">
                      <div
                        className="flex w-full cursor-pointer flex-row justify-between"
                        onClick={() => setSortType(docSortTypeKey)}
                        onKeyDown={e => e.key === "Enter" && setSortType(docSortTypeKey)}
                      >
                        {sortType === docSortTypeKey ? (
                          <span className="font-pretendard-bold text-base text-custom-blue-500">
                            {SortTypes[docSortTypeKey as keyof typeof SortTypes]}
                            {/*docSortTypeKey가 SortTypes의 유효한 키인지 확인. 컴파일 단계에서 안전성을 확보하고, 런타임 오류를 방지*/}
                          </span>
                        ) : (
                          <span className="font-pretendard-medium text-base">
                            {SortTypes[docSortTypeKey as keyof typeof SortTypes]}
                          </span>
                        )}
                        {sortType === docSortTypeKey ? (
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
                  {/* DocTypes 객체에서 key 배열 생성 */}
                  {Object.keys(DocTypes).map(docTypeKey => (
                    <button
                      key={docTypeKey}
                      onClick={() =>
                        setDocTypes(
                          prevTags =>
                            prevTags.includes(docTypeKey)
                              ? prevTags.filter(t => t !== docTypeKey)
                              : [...prevTags, docTypeKey].slice(0, 2), // 태그 선택 2개만 가능하게
                        )
                      }
                      className={`font-pretendard-bold rounded-[40px] border-2 border-custom-blue-500 px-3 py-1 text-xs ${
                        docTypes.includes(docTypeKey) ? "bg-custom-blue-500 text-white" : "text-custom-blue-500"
                      }`}
                    >
                      {DocTypes[docTypeKey as keyof typeof DocTypes]} {/* 자료태그키 확인 및 한글로 렌더링 */}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    resetFilters(); // 필터 초기화
                  }}
                  className="font-pretendard-medium flex flex-row gap-x-1 text-sm text-[#A4A4A4]"
                >
                  <Image src="/icons/ResetIcon.svg" alt="Reset" width={14} height={17} />
                  <span>초기화</span>
                </button>
              </>
            </div>

            {/* 고정된 SubmitFormBtn */}
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
