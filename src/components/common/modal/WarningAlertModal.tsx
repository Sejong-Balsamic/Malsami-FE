import React from "react";

interface WarningAlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function WarningAlertModal({ isOpen, title, message, confirmLabel, onConfirm, onCancel }: WarningAlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
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

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onConfirm}
          className="absolute bottom-[20px] right-[16px] h-[40px] w-[115px] rounded-[8px] bg-red-600 text-SUIT_14 font-semibold text-white"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

WarningAlertModal.defaultProps = {
  confirmLabel: "확인",
};

export default WarningAlertModal;
