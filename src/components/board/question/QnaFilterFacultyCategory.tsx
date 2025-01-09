"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setFaculty } from "@/store/facultySlice";
import ImageWrapper from "../tags/ImageWrapper";
import QnaSelectFacultyModal from "./QnaSelectFacultyModal";

function QnaFilterFacultyCategory() {
  const dispatch = useDispatch();
  const faculty = useSelector((state: RootState) => state.faculty.faculty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSelected, setLastSelected] = useState("단과대 선택");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (selectedFaculty: string) => {
    if (selectedFaculty !== "전체") {
      setLastSelected(selectedFaculty);
    }
    dispatch(setFaculty(selectedFaculty));
    closeModal();
  };

  // 단과대 직접 선택 (텍스트 클릭 시)
  const handleDirectSelect = (selectedFaculty: string) => {
    dispatch(setFaculty(selectedFaculty));
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
          onClick={() => handleDirectSelect("전체")}
        >
          전체
        </button>

        <div className="flex flex-1">
          {lastSelected === "단과대 선택" ? (
            // 초기 상태: 단과대 선택 버튼
            <button
              type="button"
              onClick={openModal}
              className="flex-1 p-1 text-lg font-pretendard-medium border-b-2 border-[#EEEEEE] text-[#ABABAB]"
            >
              단과대 선택
            </button>
          ) : (
            // 단과대 선택 후 상태
            <>
              <button
                type="button"
                onClick={() => handleDirectSelect(lastSelected)}
                className={`flex-1 p-1 text-lg ${
                  faculty === "전체"
                    ? "font-pretendard-medium border-b-2 border-[#EEEEEE] text-[#ABABAB]"
                    : "font-pretendard-semibold border-b-2 border-custom-blue-500 text-black"
                }`}
              >
                {lastSelected}
              </button>
              <button
                type="button"
                onClick={openModal}
                className="px-2 border-b-2 border-custom-blue-500"
              >
                <ImageWrapper src="/icons/ToggleIcon.svg" />
              </button>
            </>
          )}
        </div>
      </div>
      <QnaSelectFacultyModal isVisible={isModalOpen} onClose={closeModal} onSelect={handleSelect} />
    </div>
  );
}

export default QnaFilterFacultyCategory;
