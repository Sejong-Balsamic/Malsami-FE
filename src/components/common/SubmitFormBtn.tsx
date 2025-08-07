interface SubmitFormBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function SubmitFormBtn({ onClick, disabled = false }: SubmitFormBtnProps) {
  return (
    <button
      type="button"
      className={`font-pretendard-semibold h-10 w-full rounded-[10px] py-[10px] text-base text-white ${
        disabled ? "cursor-not-allowed bg-gray-300" : "bg-custom-blue-400 hover:bg-custom-blue-500"
      }`}
      onClick={onClick}
      disabled={disabled} // 버튼 비활성화 처리
    >
      확인
    </button>
  );
}

// defaultProps 선언. 없으면 eslint 오류
SubmitFormBtn.defaultProps = {
  disabled: false,
};
