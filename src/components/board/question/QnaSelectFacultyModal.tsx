import { useState, useEffect } from "react";
import getFaculties from "@/apis/question/getFaculties"; // 실제 API URL에 맞게 조정
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import Image from "next/image";

interface QnaBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (selection: string) => void;
}

function QnaSelectFacultyModal({ isVisible, onClose, onSelect }: QnaBottomSheetModalProps) {
  const [faculties, setFaculties] = useState<string[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultys = async () => {
      try {
        const response = await getFaculties();
        const facultyNames = response.faculties
          .filter((f: { isActive: boolean }) => f.isActive)
          .map((f: { name: string }) => f.name);

        setFaculties(facultyNames);
      } catch (error) {
        console.error("단과대 호출 api 도중 문제 발생", error);
      }
    };
    if (isVisible) {
      fetchFacultys();
    }
  }, [isVisible]);

  // 목록 하나 클릭
  const handleSelect = (faculty: string) => {
    setSelectedFaculty(faculty);
  };

  // "확인" 버튼
  const handleSubmit = () => {
    if (selectedFaculty) {
      onSelect(selectedFaculty);
    }
    onClose();
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <div className="font-pretendard-bold mb-[30px] text-xl">단과대 선택</div>
      <ul>
        {faculties.map(faculty => (
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

      {/* 고정된 Submit 버튼 */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmit} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaSelectFacultyModal;
