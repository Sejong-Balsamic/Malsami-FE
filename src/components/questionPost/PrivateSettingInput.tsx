interface PrivateSettingProps {
  isPrivate: boolean;
  onToggle: () => void;
}

function PrivateSettingInput({ isPrivate, onToggle }: PrivateSettingProps) {
  return (
    <div className="mb-[26px] block">
      {/* <div className="font-pretendard-semibold mb-2 text-lg">추가 설정</div> */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggle}
          className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${
            isPrivate ? "bg-custom-blue-500" : "bg-gray-300"
          }`}
          aria-pressed={isPrivate}
        >
          {isPrivate && (
            <svg
              className="h-4 w-4 text-question-main"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className="font-pretendard-medium text-base text-[#9B9B9B]">내 정보 비공개</span>
      </div>
    </div>
  );
}

export default PrivateSettingInput;
