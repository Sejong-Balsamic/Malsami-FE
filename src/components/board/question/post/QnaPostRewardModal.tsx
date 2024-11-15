import { useState } from "react";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";

interface QnaBottomSheetModalProps {
  reward: number;
  isVisible: boolean;
  onClose: () => void;
  onSelectReward: (reward: number) => void;
}

function QnaPostRewardModal({ reward, isVisible, onClose, onSelectReward }: QnaBottomSheetModalProps) {
  const [newReward, setNewReward] = useState(reward);
  const maxReward = 300; // 최대 엽전 값

  const decreaseReward = () => {
    if (newReward > 10) setNewReward(newReward - 10);
  };

  const increaseReward = () => {
    if (newReward < maxReward - 10) setNewReward(newReward + 10);
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReward(Number(e.target.value));
  };

  const handleRewardSubmit = () => {
    onSelectReward(newReward);
    onClose(); // 선택 후 모달 닫기
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <div className="font-pretendard-bold mb-[30px] text-xl">엽전 현상금</div>
      <div className="mb-6 flex items-center">
        <input
          type="range"
          min="0"
          max={maxReward}
          value={newReward}
          onChange={handleRewardChange}
          className="custom-slider mr-4 w-full"
          style={{
            background: `linear-gradient(to right, #03B89E ${(newReward / maxReward) * 100}%, #D9D9D9 ${(newReward / maxReward) * 100}%)`,
          }}
        />
        <span className="font-semibold text-black">{newReward}</span>
      </div>

      {/* - 버튼 */}
      <button
        type="button"
        onClick={decreaseReward}
        className="w-15 mr-4 rounded-2xl bg-gray-200 px-3 py-1 text-lg font-semibold"
        disabled={newReward <= 0}
      >
        -10
      </button>
      {/* + 버튼 */}
      <button
        type="button"
        onClick={increaseReward}
        className="w-15 rounded-2xl bg-gray-200 px-3 py-1 text-lg font-semibold"
        disabled={newReward >= maxReward}
      >
        +10
      </button>
      {/* 고정된 SubmitFormBtn */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleRewardSubmit} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaPostRewardModal;
