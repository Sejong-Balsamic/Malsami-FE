export default function SubmitFormBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="font-pretendard-semibold h-10 w-full rounded-[10px] bg-custom-blue-400 py-[10px] text-base text-white hover:bg-custom-blue-500"
      onClick={onClick}
    >
      확인
    </button>
  );
}
