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

  const handleSubmit = () => {
    onSelectSubject(searchTerm); // 부모 컴포넌트로 선택된 값을 전달
    onClose(); // 모달 닫기
  };

  return (
    <BottomSheetModal isVisible={isVisible} onClose={onClose}>
      <h1 className="font-pretendard-bold mb-[20px] text-xl">교과목명 검색</h1>
      {/* SubjectSearchInput 통합 */}
      <SubjectSearchInput value={searchTerm} onChange={setSearchTerm} />
      {/* 고정된 SubmitFormBtn */}
      <div className="absolute bottom-0 left-0 w-full bg-white px-[30px] py-4">
        <SubmitFormBtn onClick={handleSubmit} />
      </div>
    </BottomSheetModal>
  );
}

export default QnaPostSubjectModal;
