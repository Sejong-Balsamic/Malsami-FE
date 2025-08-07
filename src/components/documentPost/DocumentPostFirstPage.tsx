import subjects from "@/types/subjects";
import DocumentCustomTagSelector from "@/components/documentPost/DocumentCustomTagSelector";
import DocumentSubjectSelector from "@/components/documentPost/DocumentSubjectSelector";
import DocumentStudyYearSelector from "@/components/documentPost/DocumentStudyYearSelector";
import DocumentJiJeongTagSelector from "@/components/documentPost/DocumentJiJeongTagSelector";
import { DocumentFirstPageProps } from "./DocumentPostTypes";

export default function DocumentPostFirstPage({
  formData,
  onSubjectChange,
  onStudyYearChange,
  onCategoryTagsChange,
  onCustomTagsChange,
  onNextPage,
}: DocumentFirstPageProps): JSX.Element {
  const isSubjectCompleted = subjects.includes(formData.subject);
  const isStudyYearCompleted = isSubjectCompleted && formData.studyYear !== null;
  const isCategoryCompleted = isStudyYearCompleted && formData.categoryTags.length > 0;

  const handleRemoveCustomTag = (tag: string) => {
    onCustomTagsChange(formData.customTags.filter(t => t !== tag));
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        {/* 과목명 섹션 */}
        <DocumentSubjectSelector value={formData.subject} onChange={onSubjectChange} />

        {/* 수강 학기년도 섹션. 과목명 입력된 경우에만 표시 */}
        {isSubjectCompleted && <DocumentStudyYearSelector year={formData.studyYear} onYearChange={onStudyYearChange} />}

        {/* 기본 태그 섹션. 수강학기년도 선택된 경우에만 표시 */}
        {isStudyYearCompleted && (
          <DocumentJiJeongTagSelector selectedTags={formData.categoryTags} onTagsSelect={onCategoryTagsChange} />
        )}

        {/* 자유 태그 섹션. 기본 태그 선택된 경우에만 표시 */}
        {isCategoryCompleted && (
          <DocumentCustomTagSelector
            tags={formData.customTags}
            onTagsSubmit={onCustomTagsChange}
            onRemoveTag={handleRemoveCustomTag}
          />
        )}
      </div>

      {/* 다음 페이지 이동 버튼 */}
      {isCategoryCompleted && (
        <div className="mb-[60px] mt-auto">
          <button
            type="button"
            onClick={onNextPage}
            className={`w-full rounded-[8px] py-4 text-SUIT_18 font-extrabold text-white ${
              isCategoryCompleted ? "bg-document-main" : "bg-ui-muted"
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
