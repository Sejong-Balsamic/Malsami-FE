// src/components/questionDetail/ChaetaekCheckModal.tsx
/* eslint-disable */

import React, { useState } from "react";
import { answerPostApi } from "@/apis/answerPostApi";
import ChaetaekSuccessModal from "./ChaetaekSuccessModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  answerPostId: string;
  author: string;
}

function ChaetaekCheckModal({ isOpen, onClose, answerPostId, author }: ModalProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      // 신식 API 패턴(answerPostApi) 사용 — 채택 대상 답변 PK를 postId로 전달
      await answerPostApi.chaetaekAnswerPost({ postId: answerPostId });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("채택 요청 실패:", error);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

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
          <h1 className="font-suit-bold pb-2.5 text-SUIT_18">답변 채택</h1>
          <div className="font-suit-medium w-full border-t-2 border-ui-divider-light pb-5 pt-2.5 text-center text-SUIT_16">
            채택하시겠습니까?
            <br />
            채택한 경우 취소가 불가능합니다.
          </div>
          <div className="flex h-8 w-full justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="font-suit-semibold h-8 flex-1 rounded-lg border border-legacy-accept-blue bg-white text-SUIT_14 text-legacy-accept-blue"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={handleConfirm}
              className="font-suit-semibold h-8 flex-1 rounded-lg bg-legacy-accept-blue text-SUIT_14 text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
      {isSuccessModalOpen && (
        <ChaetaekSuccessModal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose} author={author} />
      )}
    </div>
  );
}

export default ChaetaekCheckModal;
