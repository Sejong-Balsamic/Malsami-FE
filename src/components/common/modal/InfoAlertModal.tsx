import React from "react";

interface InfoAlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function InfoAlertModal({ isOpen, title, message, confirmLabel, onConfirm, onCancel }: InfoAlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      {/* 어두운 배경 */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onCancel}
        onKeyDown={e => e.key === "Enter" && onCancel()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* 모달 박스 */}
      <div className="relative h-[154px] w-[266px] rounded-[8px] bg-white shadow-[2px_2px_10px_rgba(0,0,0,0.10)]">
        {/* 제목 */}
        <h2 className="absolute left-1/2 top-[20px] -translate-x-1/2 text-center text-SUIT_16 font-semibold text-black">
          {title}
        </h2>

        {/* 메시지 */}
        <p className="absolute left-1/2 top-[50px] w-[230px] -translate-x-1/2 text-center text-SUIT_14 font-medium text-ui-body">
          {message}
        </p>

        {/* 취소 버튼 */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute bottom-[20px] left-[16px] h-[40px] w-[115px] rounded-[8px] bg-ui-disabled text-SUIT_14 font-semibold text-white"
        >
          취소
        </button>

        {/* 로그인 버튼 (그라데이션 배경) */}
        <button
          type="button"
          onClick={onConfirm}
          className="absolute bottom-[20px] right-[16px] h-[40px] w-[115px] rounded-[8px] text-SUIT_14 font-semibold text-white"
          style={{
            background: "linear-gradient(91deg, #00D1F2 0%, #00E271 100%)",
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

InfoAlertModal.defaultProps = {
  confirmLabel: "로그인",
};

export default InfoAlertModal;
