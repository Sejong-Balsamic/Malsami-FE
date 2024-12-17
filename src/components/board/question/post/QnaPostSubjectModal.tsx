import { useState } from "react";
import BottomSheetModal from "@/components/common/BottomSheetModal";
import SubmitFormBtn from "@/components/common/SubmitFormBtn";
import SubjectSearchInput from "../SubjectSearchInput";

interface QnaPostSubjectTagModalProps {
  isVisible: boolean;
  onClose: () => void;
  subject: string;
  onSelectSubject: (subject: string) => void;
}

function QnaPostSubjectModal({ isVisible, onClose, subject, onSelectSubject }: QnaPostSubjectTagModalProps) {
  const [searchTerm, setSearchTerm] = useState(subject); // 입력된 검색어 상태
  const [isValidSubject, setIsValidSubject] = useState(false); // 유효한 교과목명 여부

  const handleSubjectChange = (term: string, isValid: boolean) => {
    setSearchTerm(term); // 검색어 업데이트
    setIsValidSubject(isValid); // 유효성 업데이트
  };

  const handleSubmit = () => {
    if (isValidSubject) {
      onSelectSubject(searchTerm); // 부모 컴포넌트로 선택된 값을 전달
      onClose(); // 모달 닫기
    }
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <h1 className="font-pretendard-bold mb-[20px] text-xl">교과목명 검색</h1>
      {/* SubjectSearchInput 통합 */}
      <SubjectSearchInput value={searchTerm} onChange={handleSubjectChange} />
      {/* 고정된 SubmitFormBtn */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmit} disabled={!isValidSubject} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaPostSubjectModal;
