/* eslint-disable */

import React, { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";
import SubmitFormBtn from "./SubmitFormBtn";

interface BottomSheetModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ isVisible, children, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState("50vh"); // 초기 modalHeight 50%로 설정
  const contentRef = useRef<HTMLDivElement>(null);

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

  //스크롤 하면 모달 창 크게하는 함수 (height 50% -> 75%로)
  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const scrollThreshold = 100; // 스크롤이 100px 이상 내려가면 모달 크기를 확장
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
              transition: "max-height 0.5s ease", // max-height에 대한 트랜지션 추가
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
              style={{ maxHeight: "calc(75vh - 80px)" }}
              onScroll={handleScroll}
              ref={contentRef}
            >
              {children}
            </div>

            {/* 고정된 SubmitFormBtn */}
            <div className="absolute bottom-0 left-0 w-full px-[18px] py-4 bg-white">
              <SubmitFormBtn onClick={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomSheetModal;
