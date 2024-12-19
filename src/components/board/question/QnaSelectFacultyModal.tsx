import { useState, useEffect } from "react";
import getFacultys from "@/apis/question/getFacultys";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import Image from "next/image";

interface QnaBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (selection: string) => void;
}

function QnaSelectFacultyModal({ isVisible, onClose, onSelect }: QnaBottomSheetModalProps) {
  const [facultys, setFacultys] = useState<string[]>([]); // API로부터 받은 학부 데이터 저장
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  // API 호출하여 facultys 데이터 가져오기
  useEffect(() => {
    const fetchFacultys = async () => {
      try {
        const response = await getFacultys(); // API 호출
        console.log("asdf", response);
        const facultyNames = response.faculties
          .filter((faculty: { isActive: boolean }) => faculty.isActive) // isActive가 true인 항목만
          .map((faculty: { name: string }) => faculty.name); // name만 추출
        setFacultys(facultyNames);
      } catch (error) {
        console.error("단과대 호출 api 도중 문제 발생", error);
      }
    };
    if (isVisible) {
      fetchFacultys(); // 모달이 열릴 때 데이터를 가져옴
    }
  }, [isVisible]);

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
