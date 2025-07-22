import { useState } from "react";
import subjects from "@/types/subjects";
import CustomTagSelector from "@/components/questionPost/CustomTagSelector";
import QuestionCommonInput from "@/components/common/QuestionCommonInput";
import DocumentSubjectSelector from "@/components/documentPost/DocumentSubjectSelector";
import { DocumentFirstPageProps } from "./DocumentPostTypes";

export default function DocumentPostFirstPage({
  formData,
  onSubjectChange,
  onStudyYearChange,
  onCategoryTagsChange,
  onCustomTagsChange,
  onNextPage,
}: DocumentFirstPageProps): JSX.Element {
  const [categoryInput, setCategoryInput] = useState<string>("");

  const isSubjectCompleted = subjects.includes(formData.subject);
  const isCategoryCompleted = isSubjectCompleted && formData.categoryTags.length > 0;

  const handleAddCategoryTag = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !formData.categoryTags.includes(trimmed) && formData.categoryTags.length < 4) {
      onCategoryTagsChange([...formData.categoryTags, trimmed]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategoryTag = (tag: string) => {
    onCategoryTagsChange(formData.categoryTags.filter(t => t !== tag));
  };

  const handleRemoveCustomTag = (tag: string) => {
    onCustomTagsChange(formData.customTags.filter(t => t !== tag));
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        {/* 과목명 */}
        <DocumentSubjectSelector value={formData.subject} onChange={onSubjectChange} onSelect={onSubjectChange} />

        {/* 수강 학기/년도 */}
        {isSubjectCompleted && (
          <div>
            <h2 className="font-suit-medium mb-3 text-base">수강 학기</h2>
            <QuestionCommonInput
              value={formData.studyYear.toString()}
              onChange={e => onStudyYearChange(Number(e.target.value))}
              placeholder="2024"
            />
          </div>
        )}

        {/* 기본 태그 입력 */}
        {isSubjectCompleted && (
          <div>
            <h2 className="font-suit-medium mb-3 text-base">기본 태그 (쉼표 없이 입력)</h2>
            <div className="flex gap-2">
              <QuestionCommonInput
                value={categoryInput}
                onChange={e => setCategoryInput(e.target.value)}
                placeholder="예: 기출문제"
              />
              <button type="button" className="rounded bg-question-main px-3 text-white" onClick={handleAddCategoryTag}>
                추가
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.categoryTags.map((tag: string) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 rounded-full border border-question-main px-3 py-1 text-[12px] text-question-main"
                >
                  <span>{tag}</span>
                  <button type="button" onClick={() => handleRemoveCategoryTag(tag)} className="text-[10px]">
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 자유 태그 */}
        {isCategoryCompleted && (
          <CustomTagSelector
            tags={formData.customTags}
            onTagsSubmit={onCustomTagsChange}
            onRemoveTag={handleRemoveCustomTag}
          />
        )}
      </div>

      {isCategoryCompleted && (
        <div className="mb-[60px] mt-auto">
          <button
            type="button"
            onClick={onNextPage}
            className="w-full rounded-[8px] bg-question-main py-4 text-SUIT_18 font-extrabold text-white"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
