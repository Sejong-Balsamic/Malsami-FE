export default function SubmitFormBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="w-full h-10 py-[10px] bg-custom-blue-400 hover:bg-custom-blue-500 text-white text-base font-pretendard-semibold rounded-[10px]"
      onClick={onClick}
    >
      적용하기
    </button>
  );
}
