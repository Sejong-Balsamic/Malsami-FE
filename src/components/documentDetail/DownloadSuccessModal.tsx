import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function DownloadSuccessModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
  };

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
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-5">
          <h1 className="font-suit-bold pb-[10px] text-[18px]">파일 다운로드</h1>
          <div className="font-suit-medium w-full border-t-2 border-ui-divider-light pb-5 pt-[10px] text-center text-SUIT_16">
            파일이 성공적으로 다운로드되었습니다!
            <br />
            엽전 현상금이 소모되었습니다!
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              type="button"
              onClick={handleConfirm}
              className="font-suit-semibold h-[30px] w-full rounded-lg bg-legacy-accept-blue text-[14px] text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadSuccessModal;
