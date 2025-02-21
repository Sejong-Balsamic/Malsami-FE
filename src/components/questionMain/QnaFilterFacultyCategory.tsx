"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../global/store";
import { setSelectedFaculty } from "@/global/store/facultySlice";
import ImageWrapper from "../../deprecated/ImageWrapper";
import QnaSelectFacultyModal from "./QnaSelectFacultyModal";

// 부모에서 전달받을 props 인터페이스
interface QnaFilterFacultyCategoryProps {
  onAllFacultySelect: () => void; // "전체" 버튼 누르면 실행할 콜백
  onFacultySelect: (faculty: string) => void; // 특정 단과대 선택하면 실행할 콜백
  isAllFacultySelected: boolean; // 현재 "전체" 상태인지 여부
}

function QnaFilterFacultyCategory({
  onAllFacultySelect,
  onFacultySelect,
  isAllFacultySelected,
}: QnaFilterFacultyCategoryProps) {
  const dispatch = useDispatch();

  // Redux에서 question 게시판용 단과대 가져오기
  const facultyInRedux = useSelector((state: RootState) => state.facultyState.selectedFacultyMapByBoard.question);
  const displayedFaculty = facultyInRedux || "단과대 선택";

  // 모달 열고 닫기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // "전체" 버튼 클릭 -> 부모 콜백 호출
  const handleAllSelect = () => {
    onAllFacultySelect();
  };

  // 모달에서 특정 단과대 선택 시
  const handleSelectFaculty = (selectedFaculty: string) => {
    // 먼저 Redux 업데이트
    dispatch(
      setSelectedFaculty({
        board: "question",
        faculty: selectedFaculty,
      }),
    );
    // 부모 콜백
    onFacultySelect(selectedFaculty);
    closeModal();
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        {/* 왼쪽 "전체" 버튼 */}
        <button
          type="button"
          onClick={handleAllSelect}
          className={`w-[50%] border-b-2 p-1 text-lg ${
            isAllFacultySelected
              ? // 전체가 활성화된 상태
                "font-pretendard-semibold border-custom-blue-500 text-black"
              : // 전체가 비활성화된 상태
                "font-pretendard-medium border-[#EEEEEE] text-[#ABABAB]"
          }`}
        >
          전체
        </button>

        {/* 오른쪽 단과대 선택 버튼/영역 */}
        <div
          className={`flex flex-1 border-b-2 ${
            isAllFacultySelected
              ? // 전체가 활성화된 상태 -> 오른쪽 비활성화 스타일
                "border-[#EEEEEE]"
              : // 전체가 비활성화 -> 오른쪽 활성화 스타일
                "border-custom-blue-500"
          }`}
        >
          {displayedFaculty === "단과대 선택" ? (
            <button
              type="button"
              onClick={openModal}
              className={`font-pretendard-medium flex-1 p-1 text-lg ${
                isAllFacultySelected ? "text-[#ABABAB]" : "text-[#ABABAB]"
              } `}
            >
              단과대 선택
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  // 단과대를 선택한 상태 -> faculty 값 API 재요청
                  onFacultySelect(displayedFaculty);
                }}
                className={`flex-1 p-1 text-lg ${
                  isAllFacultySelected
                    ? // 전체 모드이면 비활성
                      "font-pretendard-medium text-[#ABABAB]"
                    : // 전체 모드가 아니면 활성
                      "font-pretendard-semibold text-black"
                } `}
              >
                {displayedFaculty}
              </button>
              {/* 토글 아이콘 */}
              <button type="button" onClick={openModal} className="px-2">
                <ImageWrapper src="/icons/ToggleIcon.svg" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* 단과대 선택 모달 */}
      <QnaSelectFacultyModal isVisible={isModalOpen} onClose={closeModal} onSelect={handleSelectFaculty} />
    </div>
  );
}

export default QnaFilterFacultyCategory;
