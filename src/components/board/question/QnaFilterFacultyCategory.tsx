"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setFaculty } from "@/store/facultySlice";
import ImageWrapper from "../tags/ImageWrapper";
import QnaSelectFacultyModal from "./QnaSelectFacultyModal";

function QnaFilterFacultyCategory() {
  const dispatch = useDispatch();
  const faculty = useSelector((state: RootState) => state.faculty.faculty); // Redux에서 faculty 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSelected, setLastSelected] = useState("단과대 선택"); // "전체" 선택 시 표시할 최근 선택 학부

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (selectedFaculty: string) => {
    if (selectedFaculty !== "전체") {
      setLastSelected(selectedFaculty); // "전체"가 아닌 경우에만 lastSelected 업데이트
    }
    dispatch(setFaculty(selectedFaculty)); // Redux 상태 업데이트
    closeModal();
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        <button
          type="button"
          className={`w-[50%] p-1 text-lg ${
            faculty === "전체"
              ? "font-pretendard-semibold border-b-2 border-custom-blue-500 text-black"
              : "font-pretendard-medium border-b-2 border-[#EEEEEE] text-[#ABABAB]"
          }`}
          onClick={() => handleSelect("전체")}
        >
          전체
        </button>

        <div className="relative flex-1">
          <button
            type="button"
            className={`w-full p-1 text-lg ${
              faculty === "전체"
                ? "font-pretendard-medium border-b-2 border-[#EEEEEE] text-[#ABABAB]"
                : "font-pretendard-semibold border-b-2 border-custom-blue-500 text-black"
            }`}
          >
            {faculty === "전체" ? lastSelected : faculty} {/* faculty가 "전체"인 경우 lastSelected를 표시 */}
            <span onClick={openModal}>
              <ImageWrapper src="/icons/ToggleIcon.svg" />
            </span>
          </button>
          <QnaSelectFacultyModal isVisible={isModalOpen} onClose={closeModal} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}

export default QnaFilterFacultyCategory;
