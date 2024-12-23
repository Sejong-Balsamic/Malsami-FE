import { useState } from "react";
import Image from "next/image";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import docStudyYears from "@/lib/docStudyYears";

interface DocPostStudyYearModalProps {
  isVisible: boolean;
  onClose: () => void;
  studyYear: number;
  onSubmitStudyYear: (year: number) => void; // 숫자 값 전달
}

function DocPostStudyYearModal({ isVisible, onClose, studyYear, onSubmitStudyYear }: DocPostStudyYearModalProps) {
  const [selectedYear, setSelectedYear] = useState<number>(studyYear); // 선택된 학년

  const handleSubmitYear = () => {
    onSubmitStudyYear(selectedYear); // 선택한 학년 전달
    onClose(); // 모달 닫기
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <h1 className="font-pretendard-bold mb-[20px] text-xl">수강년도</h1>
      {/* <div className="mb-[30px] flex flex-col">
        {docStudyYears.map(year => (
          <li key={year} className="flex rounded-xl py-[10px]">
            <div
              className="flex w-full cursor-pointer flex-row justify-between"
              onClick={() => setSelectedYear(year)} // 선택된 학년 업데이트
              onKeyDown={e => e.key === "Enter" && setSelectedYear(year)}
              role="button"
              tabIndex={0}
            >
              {selectedYear === year ? (
                <span className="font-pretendard-bold text-base text-custom-blue-500">{year}</span>
              ) : (
                <span className="font-pretendard-medium text-base">{year}</span>
              )}
              {selectedYear === year ? (
                <Image src="/icons/CheckedIcon.svg" alt="CheckedIcon" width={14} height={14} />
              ) : (
                <Image src="/icons/UnCheckedIcon.svg" alt="UnCheckedIcon" width={14} height={14} />
              )}
            </div>
          </li>
        ))}
      </div> */}
      <div className="mb-[30px] flex flex-col">
        {docStudyYears.map(year => (
          <li key={year} className="flex rounded-xl py-[10px]">
            <div
              className="flex w-full cursor-pointer items-center" // 아이템을 세로로 가운데 정렬
              onClick={() => setSelectedYear(year)} // 선택된 학년 업데이트
              onKeyDown={e => e.key === "Enter" && setSelectedYear(year)}
              role="button"
              tabIndex={0}
            >
              {/* year를 가운데 정렬 */}
              <div className="flex-grow text-center">
                <span
                  className={`text-base ${
                    selectedYear === year ? "font-pretendard-bold text-custom-blue-500" : "font-pretendard-medium"
                  }`}
                >
                  {year}
                </span>
              </div>
              {/* 체크 아이콘은 오른쪽 끝에 위치 */}
              <div className="flex-shrink-0">
                {selectedYear === year ? (
                  <Image src="/icons/CheckedIcon.svg" alt="CheckedIcon" width={14} height={14} />
                ) : (
                  <Image src="/icons/UnCheckedIcon.svg" alt="UnCheckedIcon" width={14} height={14} />
                )}
              </div>
            </div>
          </li>
        ))}
      </div>

      {/* 고정된 Submit 버튼 */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmitYear} />
      </div>
    </BottomSheetModal>
  );
}

export default DocPostStudyYearModal;
