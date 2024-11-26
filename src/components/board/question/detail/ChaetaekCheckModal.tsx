import React, { useState } from "react";
import chaetaekAnswer from "@/apis/question/chaetaekAnswer";
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
      const response = await chaetaekAnswer(answerPostId);
      console.log("채택 성공:", response);
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
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" />
      {/* 모달 본체 */}
      <div
        className="relative z-10 h-48 w-[336px] rounded-2xl bg-cover bg-center"
        style={{
          backgroundImage: 'url("/image/ModalBG.png")',
        }}
      >
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-[20px]">
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-[#EEEEEE] pb-[20px] pt-[10px] text-center text-[16px]">
            채택하시겠습니까?
            <br />
            채택한 경우 취소가 불가능합니다.
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              type="button"
              onClick={onClose}
              className="font-pretendard-semibold h-[30px] w-[140px] rounded-lg border border-[#0062d2] bg-white text-[14px] text-[#0062d2]"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={handleConfirm}
              className="font-pretendard-semibold h-[30px] w-[140px] rounded-lg bg-[#0062d2] text-[14px] text-white"
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
