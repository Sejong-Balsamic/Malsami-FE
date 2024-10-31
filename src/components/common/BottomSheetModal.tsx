import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

interface BottomSheetModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ isVisible, children, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 300); // 애니메이션 후 숨김 처리
    }
  }, [isVisible]);

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 flex items-end justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {/* 반투명한 배경 오버레이 */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

          {/* 모달 컨텐츠 */}
          <div
            className="bg-white w-full  mx-auto rounded-t-[20px] shadow-lg pt-9 px-[18px] pb-5 transition-transform duration-300 transform"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute top-[38px] right-[18px]">
              <Image
                src="/icons/CloseIcon.png" // 이미지 경로
                alt="Close"
                width={13}
                height={13}
              />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomSheetModal;
