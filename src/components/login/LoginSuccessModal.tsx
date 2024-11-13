import Image from "next/image";

interface LoginSuccessModalProps {
  onClose: () => void;
  userName: string;
}

function LoginSuccessModal({ onClose, userName }: LoginSuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-3xl bg-white p-10 text-center shadow-lg">
        {/* 이미지 */}
        <Image
          src="/image/PartyPopper.jpg" // 이미지 경로
          alt="Success"
          width={160}
          height={160}
          className="mx-auto mb-10"
        />
        {/* 성공 메시지 */}
        <h2 className="font-pretendard-bold mb-2 text-[20px]">{userName}님 반가워요!</h2>
        <p className="font-pretendard-semibold mb-6 text-[14px] text-[#9B9B9B]">
          세종 말싸미에서 다양한 학습 자료들을 만나보세요!
        </p>
        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="font-pretendard-semibold rounded-3xl bg-custom-orange-300 px-6 py-3 text-[16px] text-white hover:bg-custom-orange-400"
        >
          100 포인트 받기
        </button>
      </div>
    </div>
  );
}

export default LoginSuccessModal;
