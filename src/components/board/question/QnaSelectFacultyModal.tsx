import { useState } from "react";
import facultys from "@/lib/facultys";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import Image from "next/image";

interface QnaBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (selection: string) => void;
}

function QnaSelectFacultyModal({ isVisible, onClose, onSelect }: QnaBottomSheetModalProps) {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const handleSelect = (faculty: string) => {
    setSelectedFaculty(faculty);
  };

  const handleSubmit = () => {
    if (selectedFaculty) {
      onSelect(selectedFaculty); // 최종 선택된 학부를 부모로 전달
    }
    onClose(); // 모달 닫기
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <div className="font-pretendard-bold mb-[30px] text-xl">단과대 선택</div>
      <ul className="">
        {facultys.map(faculty => (
          <li key={faculty} className="flex rounded-xl py-[10px]">
            <button
              type="button"
              className="flex w-full cursor-pointer flex-row justify-between"
              onClick={() => handleSelect(faculty)}
              onKeyDown={e => e.key === "Enter" && handleSelect(faculty)}
            >
              {selectedFaculty === faculty ? (
                <span className="font-pretendard-bold text-base text-custom-blue-500">{faculty}</span>
              ) : (
                <span className="font-pretendard-medium text-base">{faculty}</span>
              )}
              {selectedFaculty === faculty ? (
                <Image src="/icons/CheckedIcon.svg" alt="CheckedIcon" width={14} height={14} />
              ) : (
                <Image src="/icons/UnCheckedIcon.svg" alt="UnCheckedIcon" width={14} height={14} />
              )}
            </button>
          </li>
        ))}
      </ul>
      {/* 고정된 SubmitFormBtn */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmit} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaSelectFacultyModal;
