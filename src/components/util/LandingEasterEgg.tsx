import React from "react";
import Image from "next/image";

interface LandingEasterEggProps {
  isActive: boolean; // 이스터 에그 활성화 상태
  onClose: () => void; // 닫기 버튼 클릭 시 호출할 함수
}

function LandingEasterEgg({ isActive, onClose }: LandingEasterEggProps) {
  if (!isActive) return null; // 활성화 상태가 아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-[100px] w-[300px] -translate-x-1/2 rounded-lg bg-white p-4 shadow-2xl">
        <h2 className="font-pretendard-bold text-center text-xl text-black">🥚 이스터 에그 발견! 🥚</h2>
        <p className="font-pretendard-medium my-2 text-center text-sm text-gray-700">
          당신은 세종말싸미의 숨겨진 비밀을 찾았습니다!
        </p>
        <Image src="/image/EasterEgg.svg" alt="easteregg" width={300} height={220} />
        <button
          type="button"
          className="font-pretendard-semibold bg-custom-blue-400 hover:bg-custom-blue-500 mt-4 w-full rounded-lg px-4 py-2 text-white"
          onClick={onClose} // 닫기 버튼
        >
          🎉 엽전 획득! 🎉
        </button>
      </div>
    </div>
  );
}

export default LandingEasterEgg;
