import { useState } from "react";
import facultys from "@/lib/facultys";
import BottomSheetModal from "@/components/common/BottomSheetModal";

interface QnaBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (selection: string) => void;
}

function QnaSelectFacultyModal({ isVisible, onClose, onSelect }: QnaBottomSheetModalProps) {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const handleSelect = (faculty: string) => {
    setSelectedFaculty(faculty);
    onSelect(faculty);
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <div className="text-sm mb-[30px] font-pretendard-bold">단과대 선택</div>
      <ul className="space-y-3">
        {facultys.map(faculty => (
          <li key={faculty} className="flex items-center">
            <button
              className="flex items-center cursor-pointer focus:outline-none"
              type="button"
              onClick={() => handleSelect(faculty)}
              onKeyDown={e => e.key === "Enter" && handleSelect(faculty)}
            >
              <div className="relative w-4 h-4 mr-1.5">
                {selectedFaculty === faculty ? (
                  <>
                    {/* 바깥 주황색 원 */}
                    <div className="absolute inset-0 w-4 h-4 rounded-full border-2 border-custom-blue-500" />
                    {/* 안쪽 주황색 원 */}
                    <div className="absolute inset-1 w-2 h-2 rounded-full bg-custom-blue-500" />
                  </>
                ) : (
                  // 회색 단일 원 (선택되지 않은 경우)
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                )}
              </div>
              <span className="text-xs font-pretendard-semibold">{faculty}</span>
            </button>
          </li>
        ))}
      </ul>
    </BottomSheetModal>
  );
}

export default QnaSelectFacultyModal;
