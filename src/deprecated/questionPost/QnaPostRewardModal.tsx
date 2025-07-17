// import { useState } from "react";
// import BottomSheetModal from "@/components/common/BottomSheetModal";
// import SubmitFormBtn from "@/components/common/SubmitFormBtn";
// import AdjustButton from "./AdjustRewardBtn";

// interface QnaBottomSheetModalProps {
//   reward: number;
//   isVisible: boolean;
//   onClose: () => void;
//   onSelectReward: (reward: number) => void;
// }

// function QnaPostRewardModal({ reward, isVisible, onClose, onSelectReward }: QnaBottomSheetModalProps) {
//   const [newReward, setNewReward] = useState(reward);
//   const maxReward = 300; // 최대 엽전 값

//   // 엽전 증가,감소 조절하는 함수
//   const adjustReward = (amount: number) => {
//     setNewReward(prevReward => {
//       const newValue = prevReward + amount;
//       return Math.min(Math.max(newValue, 0), maxReward); // 0 이상 maxReward 이하로 맞춰주는 코드
//     });
//   };

//   const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     setNewReward(Math.min(Math.max(value, 0), maxReward)); // 범위 제한
//   };

//   const handleRewardSubmit = () => {
//     onSelectReward(newReward);
//     onClose(); // 선택 후 모달 닫기
//   };

//   return (
//     <BottomSheetModal isVisible={isVisible} onClose={onClose}>
//       <div className="font-pretendard-bold mb-[30px] text-xl">엽전 현상금</div>
//       <div className="mb-6 flex items-center">
//         <input
//           type="range"
//           min="0"
//           max={maxReward}
//           value={newReward}
//           onChange={handleRewardChange}
//           className="custom-slider mr-4 w-full"
//           style={{
//             background: `linear-gradient(to right, #03B89E ${(newReward / maxReward) * 100}%, #D9D9D9 ${(newReward / maxReward) * 100}%)`,
//           }}
//         />
//         <span className="font-semibold text-black">{newReward}</span>
//       </div>

//       {/* 버튼 그룹 */}
//       <div className="mt-10 flex items-center justify-center">
//         <div className="grid grid-cols-3 gap-x-6 gap-y-3">
//           {/* 감소 버튼 */}
//           <AdjustButton amount={-1} onClick={adjustReward} disabled={newReward <= 0} />
//           <AdjustButton amount={-10} onClick={adjustReward} disabled={newReward <= 0} />
//           <AdjustButton amount={-50} onClick={adjustReward} disabled={newReward <= 0} />

//           {/* 증가 버튼 */}
//           <AdjustButton amount={1} onClick={adjustReward} disabled={newReward >= maxReward} />
//           <AdjustButton amount={10} onClick={adjustReward} disabled={newReward >= maxReward} />
//           <AdjustButton amount={50} onClick={adjustReward} disabled={newReward >= maxReward} />
//         </div>
//       </div>

//       {/* 고정된 SubmitFormBtn */}
//       <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
//         <SubmitFormBtn onClick={handleRewardSubmit} />
//       </div>
//     </BottomSheetModal>
//   );
// }

// export default QnaPostRewardModal;
