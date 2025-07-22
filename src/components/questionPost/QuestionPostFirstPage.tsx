import { useState } from "react";
import subjects from "@/types/subjects";
import { FirstPageProps } from "./QuestionPostTypes";
import QuestionSubjectSelector from "./QuestionSubjectSelector";
import JiJeongTagSelector from "./JiJeongTagSelector";
import CustomTagSelector from "./CustomTagSelector";

function QuestionPostFirstPage({
  formData,
  onSubjectChange,
  onJiJeongTagsSelect,
  onCustomTagsSubmit,
  onNextPage,
}: FirstPageProps) {
  // 이미 과목이 선택되어 있으면 두번째 페이지엣 뒤로가기로 돌아왔을 때도 유지.
  const [isSubjectSelected, setIsSubjectSelected] = useState(() => subjects.includes(formData.subject));
  const isSubjectCompleted = !!formData.subject && isSubjectSelected;
  const isJijeongTagsCompleted = isSubjectCompleted && formData.questionPresetTags.length > 0;

  // 태그 삭제 처리
  const handleRemoveTag = (tag: string) => {
    const updatedTags = formData.customTags.filter(t => t !== tag);
    onCustomTagsSubmit(updatedTags);
  };

  // 과목 변경 핸들러
  const handleSubjectChange = (subject: string) => {
    onSubjectChange(subject);
    // 입력된 과목이 실제 과목 목록에 있는지 확인
    setIsSubjectSelected(subjects.includes(subject));
  };

  // 과목 선택 핸들러
  const handleSubjectSelect = (subject: string) => {
    onSubjectChange(subject);
    setIsSubjectSelected(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        {/* 과목명 섹션 */}
        <QuestionSubjectSelector
          value={formData.subject}
          onChange={handleSubjectChange}
          onSelect={handleSubjectSelect}
        />

        {/* 기본 태그 섹션 - 과목명이 입력된 경우에만 표시 */}
        {isSubjectCompleted && (
          <JiJeongTagSelector selectedTags={formData.questionPresetTags} onTagsSelect={onJiJeongTagsSelect} />
        )}

        {/* 자유 태그 섹션 - 기본 태그까지 선택된 경우에만 표시 */}
        {isJijeongTagsCompleted && (
          <CustomTagSelector
            tags={formData.customTags}
            onTagsSubmit={onCustomTagsSubmit}
            onRemoveTag={handleRemoveTag}
          />
        )}
      </div>

      {/* 다음 페이지 이동 버튼 */}
      {isJijeongTagsCompleted && (
        <div className="mb-[60px] mt-auto">
          <button
            type="button"
            onClick={onNextPage}
            disabled={!isJijeongTagsCompleted}
            className={`w-full rounded-[8px] py-4 text-SUIT_18 font-extrabold text-white ${
              isJijeongTagsCompleted ? "bg-question-main" : "bg-ui-muted"
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionPostFirstPage;
