import React, { useState } from "react";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import DownloadSuccessModal from "./DownloadSuccessModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentFileId: string;
  originalFileName: string;
}

function DownloadCheckModal({ isOpen, onClose, documentFileId, originalFileName }: ModalProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      const command: Partial<DocumentCommand> = {
        documentFileId, // 파일 ID 전달
        filePath: originalFileName, // 파일 이름 전달 (백엔드에서 필요 시 사용)
      };
      await documentPostApi.downloadDocumentFile(command); // 다운로드 API 호출
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
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
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">파일 다운로드</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-[#EEEEEE] pb-[20px] pt-[10px] text-center text-[16px]">
            {originalFileName}을(를) 다운로드 하시겠습니까?
            <br />
            다운로드 시 엽전 현상금이 소모됩니다.
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
      {isSuccessModalOpen && <DownloadSuccessModal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose} />}
    </div>
  );
}

export default DownloadCheckModal;
