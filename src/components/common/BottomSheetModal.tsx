/* eslint-disable */

// 삭제해야함. BottomSheet.tsx로 대체.
import React, { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";

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
      setTimeout(() => setShowModal(false), 300); // 300ms 애니메이션 후 showModal을 false로. 없으면 z-index가 높은 모달 배경 오버레이가 여전히 화면에 남아 사용자 인터페이스를 가리는 현상이 생긴다
      document.body.style.overflow = ""; // 스크롤 복구
    }
    return () => {
      document.body.style.overflow = ""; // 모달이 사라질 때 스크롤 복구
    };
  }, [isVisible]);

  // 스크롤 시 모달 창 크기를 50%에서 75%로 확장하는 함수
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
            className="relative mx-auto w-full min-w-[386px] max-w-[640px] transform rounded-t-[20px] bg-white p-[30px] pb-4 shadow-lg transition-transform duration-300"
            style={{
              maxHeight: modalHeight,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.5s ease-out, max-height 0.5s ease", // transform에 대한 트랜지션 추가
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 스크롤바 없애기 */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute right-[32px] top-[32px]">
              <Image src="/icons/CloseIcon.svg" alt="Close" width={20} height={20} />
            </button>

            {/* 모달 스크롤 가능한 컨텐츠 */}
            <div
              className="overflow-y-auto"
              style={{
                height: `calc(${modalHeight} - 72px)`, // 72px 하단영역을 제외한 높이 설정
                paddingBottom: "60px",
              }}
              onScroll={handleScroll}
              ref={contentRef}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomSheetModal;
