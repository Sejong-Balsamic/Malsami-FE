import Image from "next/image";

interface LoginSuccessModalProps {
  onClose: () => void;
  userName: string;
}

function LoginSuccessModal({ onClose, userName }: LoginSuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg max-w-sm w-full text-center">
        {/* 이미지 */}
        <Image
          src="/image/PartyPopper.jpg" // 이미지 경로
          alt="Success"
          width={160}
          height={160}
          className="mx-auto mb-10"
        />
        {/* 성공 메시지 */}
        <h2 className="text-[20px] font-pretendard-bold mb-2">{userName}님 반가워요!</h2>
        <p className="text-[#9B9B9B] text-[14px] font-pretendard-semibold mb-6">
          세종 말싸미에서 다양한 학습 자료들을 만나보세요!
        </p>
        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="bg-custom-orange-300 text-[16px] font-pretendard-semibold text-white py-3 px-6 rounded-3xl hover:bg-custom-orange-400"
        >
          100 포인트 받기
        </button>
      </div>
    </div>
  );
}

export default LoginSuccessModal;
