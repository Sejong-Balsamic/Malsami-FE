import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LandingDirectModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    window.location.href = "/"; // 랜딩 페이지로 이동
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
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-[20px]">
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">로그인 오류</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-[#EEEEEE] pb-[20px] pt-[10px] text-center text-[16px]">
            해당 페이지는 로그인을 해야 열람할 수 있습니다.
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              type="button"
              onClick={handleConfirm}
              className="font-pretendard-semibold h-[30px] w-full rounded-lg bg-[#0062d2] text-[14px] text-white"
            >
              랜딩페이지로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingDirectModal;
