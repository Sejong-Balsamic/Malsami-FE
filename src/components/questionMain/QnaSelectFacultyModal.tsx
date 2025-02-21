"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/global/store";
import { useSelector, useDispatch } from "react-redux";
import { setFacultiesList } from "@/global/store/facultySlice";
import getFaculties from "@/apis/question/getFaculties";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import Image from "next/image";

interface QnaBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (selection: string) => void;
}

function QnaSelectFacultyModal({ isVisible, onClose, onSelect }: QnaBottomSheetModalProps) {
  const dispatch = useDispatch();

  // Redux에서 단과대 목록, 페치 여부 가져오기
  const { facultiesList, isFacultiesFetched } = useSelector((state: RootState) => state.facultyState);

  // 현재 모달 안에서 선택된 단과대 (최종 확정 전)
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  // 모달이 열릴 때, 이미 Redux에 목록이 없으면 API 한 번 호출
  useEffect(() => {
    const fetchFacultiesIfNeeded = async () => {
      try {
        if (!isFacultiesFetched) {
          const response = await getFaculties();

          // 서버에서 받은 데이터에서 필요한 값만 필터
          // 예: { faculties: [{ name: "...", isActive: true }, ...] }
          const facultyNames = response.faculties
            .filter((f: { isActive: boolean }) => f.isActive)
            .map((f: { name: string }) => f.name);

          // Redux store에 저장
          dispatch(setFacultiesList(facultyNames));
        }
      } catch (error) {
        console.error("단과대 호출 API 도중 문제 발생:", error);
      }
    };

    if (isVisible) {
      fetchFacultiesIfNeeded();
    }
  }, [isVisible, isFacultiesFetched, dispatch]);

  // 목록 하나 클릭 시
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

  // 실제 렌더링
  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <div className="font-pretendard-bold mb-[30px] text-xl">단과대 선택</div>

      {/* 아직 API 불러오는 중이거나, facultiesList가 없을 수도 있으니 상황에 맞게 처리 */}
      {!isFacultiesFetched && facultiesList.length === 0 ? (
        <div>단과대 목록 불러오는 중...</div>
      ) : (
        <ul>
          {facultiesList.map(faculty => (
            <li key={faculty} className="flex rounded-xl py-[10px]">
              <button
                type="button"
                className="flex w-full cursor-pointer flex-row justify-between"
                onClick={() => handleSelect(faculty)}
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
      )}

      {/* 하단 고정된 Submit 버튼 */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmit} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaSelectFacultyModal;
