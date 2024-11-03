export default function SubmitFormBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="w-full h-10 py-[13px] mt-5 bg-custom-blue-500 text-white text-xs font-pretendard-bold rounded-[8px]"
      onClick={onClick}
    >
      작성완료
    </button>
  );
}
