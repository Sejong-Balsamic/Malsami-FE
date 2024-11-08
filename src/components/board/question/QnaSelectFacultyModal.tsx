import { useState } from "react";
import facultys from "@/lib/facultys";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";

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
      <ul className="space-y-3">
        {facultys.map(faculty => (
          <li key={faculty} className="flex items-center">
            <button
              className="flex cursor-pointer items-center focus:outline-none"
              type="button"
              onClick={() => handleSelect(faculty)}
              onKeyDown={e => e.key === "Enter" && handleSelect(faculty)}
            >
              <div className="relative h-4 w-4">
                {selectedFaculty === faculty ? (
                  <>
                    {/* 바깥 파랑색 원 */}
                    <div className="absolute inset-0 h-4 w-4 rounded-full border-2 border-custom-blue-500" />
                    {/* 안쪽 파랑색 원 */}
                    <div className="absolute inset-1 h-2 w-2 rounded-full bg-custom-blue-500" />
                  </>
                ) : (
                  // 회색 단일 원 (선택되지 않은 경우)
                  <div className="h-4 w-4 rounded-full bg-gray-300" />
                )}
              </div>
              <span className="font-pretendard-medium ml-3 text-base">{faculty}</span>
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
