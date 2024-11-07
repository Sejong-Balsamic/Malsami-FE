/* eslint-disable */

import React, { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import jijeongTags from "@/lib/jijeongTags";

interface QnaFilterOptionsModalProps {
  isVisible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달을 닫는 함수
  initialFilterOptions: QnaFilterOptions; // 필터 옵션의 초기값
  onApplyFilter: (filters: QnaFilterOptions) => void; // 필터 적용 함수
  children?: ReactNode; // 모달 내용으로 표시할 컴포넌트나 요소들
}

const QnaFilterOptionsModal: React.FC<QnaFilterOptionsModalProps> = ({
  isVisible,
  onClose,
  initialFilterOptions,
  onApplyFilter,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState("50vh"); // 초기 modalHeight 50%로 설정
  const contentRef = useRef<HTMLDivElement>(null);

  const [rewardYeopjeon, setRewardYeopjeon] = useState(initialFilterOptions.rewardYeopjeon);
  const [tags, setTags] = useState(initialFilterOptions.tags);
  const [sortOption, setSortOption] = useState(initialFilterOptions.sortOption);

  const handleApply = () => {
    onApplyFilter({ rewardYeopjeon, tags, sortOption }); // 수정된 부분
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
          className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* 반투명한 배경 오버레이 */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

          {/* 모달 컨텐츠 */}
          <div
            className="bg-white w-full mx-auto rounded-t-[20px] shadow-lg pt-8 px-[18px] pb-4 transition-transform duration-300 transform relative"
            style={{
              maxHeight: modalHeight,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.5s ease-out, max-height 0.5s ease", // transform에 대한 트랜지션 추가
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute top-[38px] right-[30px]">
              <Image src="/icons/CloseIcon.svg" alt="Close" width={20} height={20} />
            </button>

            {/* 모달 스크롤 가능한 컨텐츠 */}
            <div
              className="overflow-y-auto"
              style={{
                height: `calc(${modalHeight} - 72px)`, // 72px 하단영역을 제외한 높이 설정
                paddingBottom: "30px",
              }}
              onScroll={handleScroll}
              ref={contentRef}
            >
              <>
                <h1 className="text-xl mb-6 font-pretendard-bold">정렬</h1>
                <div className="flex flex-wrap mb-[40px]">
                  <label className="mr-4 flex items-center">
                    <input
                      type="radio"
                      name="filterOption"
                      value="최신순"
                      checked={sortOption === "최신순"}
                      onChange={() => setSortOption("최신순")}
                      className="mr-2"
                    />
                    최신순
                  </label>
                  <label className="mr-4 flex items-center">
                    <input
                      type="radio"
                      name="filterOption"
                      value="좋아요"
                      checked={sortOption === "좋아요"}
                      onChange={() => setSortOption("좋아요")}
                      className="mr-2"
                    />
                    좋아요
                  </label>
                  <label className="mr-4 flex items-center">
                    <input
                      type="radio"
                      name="filterOption"
                      value="엽전 현상금 순"
                      checked={sortOption === "엽전 현상금 순"}
                      onChange={() => setSortOption("엽전 현상금 순")}
                      className="mr-2"
                    />
                    엽전 현상금 순
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filterOption"
                      value="조회수"
                      checked={sortOption === "조회수"}
                      onChange={() => setSortOption("조회수")}
                      className="mr-2"
                    />
                    조회수
                  </label>
                </div>

                <h3 className="text-xl mb-6 font-pretendard-bold">
                  태그 선택 <span className=" ml-1.5 text-sm text-[#A4A4A4] font-pretendard-medium">최대 2개</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-[40px]">
                  {jijeongTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() =>
                        setTags(prevTags =>
                          prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag].slice(0, 2),
                        )
                      }
                      className={`px-1.5 py-[3px] rounded-[40px] border border-custom-blue-500 text-base font-pretendard-medium ${
                        tags.includes(tag) ? "bg-custom-blue-500 text-white" : " text-custom-blue-500"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <h1 className="text-xl mb-6 font-pretendard-bold">엽전 현상금</h1>
                <div className="flex items-center mb-6">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={rewardYeopjeon}
                    onChange={e => setRewardYeopjeon(Number(e.target.value))}
                    className="w-full mr-4"
                  />
                  <span className="text-green-500 font-semibold">{rewardYeopjeon}</span>
                </div>
              </>
            </div>

            {/* 고정된 SubmitFormBtn */}
            <div className="absolute bottom-0 left-0 w-full px-[30px] py-4  bg-white">
              <SubmitFormBtn onClick={handleApply} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QnaFilterOptionsModal;
