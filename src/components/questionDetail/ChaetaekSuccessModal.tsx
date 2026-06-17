// src/components/questionDetail/ChaetaekSuccessModal.tsx
/* eslint-disable */

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: string;
}

function ChaetaekSuccessModal({ isOpen, onClose, author }: ModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 블러 백그라운드 */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xl" />
      {/* 모달 본체 */}
      <div
        className="relative z-10 h-48 w-full max-w-[336px] rounded-2xl bg-cover bg-center"
        style={{
          backgroundImage: 'url("/image/ModalBG.png")',
        }}
      >
        <div className="flex h-48 w-full flex-col items-center justify-center rounded-2xl bg-white/50 p-5">
          <h1 className="font-pretendard-bold pb-2.5 text-SUIT_18">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-ui-divider-light pb-5 pt-2.5 text-center text-SUIT_16">
            답변이 채택되었습니다!
            <br />
            엽전 현상금이 @{author}에게 지급됩니다!
          </div>
          <div className="flex h-8 w-full justify-between">
            <button
              type="button"
              onClick={handleConfirm}
              className="font-pretendard-semibold h-8 w-full rounded-lg bg-legacy-accept-blue text-SUIT_14 text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChaetaekSuccessModal;
