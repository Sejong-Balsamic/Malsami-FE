// no need to import React in Next.js with TSX
import { SecondPageProps } from "./QuestionPostTypes";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FileUploadInput from "./FileUploadInput";
import YeopjeonSelector from "./YeopjeonSelector";

function QuestionPostSecondPage({
  formData,
  onFormChange,
  onFileChange,
  onFileDelete,
  onPrivateToggle,
  onSubmit,
}: SecondPageProps) {
  // 제목과 본문이 모두 채워졌는지 확인
  const isTitleAndContentFilled = !!formData.title.trim() && !!formData.content.trim();

  const emitChange = (field: string, value: string | number) => {
    const input = document.createElement("input");
    input.name = field;
    input.value = String(value);
    onFormChange({ target: input } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  // 엽전 변경 핸들러
  const handleRewardChange = (val: number) => emitChange("reward", val);

  // 제목 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => emitChange("title", e.target.value);

  // 본문 입력 핸들러는 textarea 이벤트를 그대로 전달하여 줄바꿈(Enter) 문제를 방지
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormChange(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        {/* 제목 */}
        <TitleInput value={formData.title} onChange={handleTitleChange} />
        {/* 본문 내용 및 익명 설정 */}
        <ContentInput
          value={formData.content}
          onChange={handleContentChange}
          isPrivate={formData.isPrivate}
          onTogglePrivate={onPrivateToggle}
        />
        {/* 이미지 첨부 */}
        <div className="flex flex-col">
          <h2 className="mb-2 text-SUIT_16 font-medium text-black">이미지</h2>
          <span className="mr-4 text-SUIT_14 font-medium text-[#898989]">최대 100MB까지 올릴 수 있어요.</span>
        </div>
        <FileUploadInput
          mediaFiles={formData.attachmentFiles}
          onFileChange={onFileChange}
          onFileDelete={onFileDelete}
        />
        {/* 엽전 현상금 */}
        <YeopjeonSelector value={formData.reward} onChange={handleRewardChange} />
      </div>

      {/* 작성완료 버튼 */}
      <div className="mb-[60px] mt-auto">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isTitleAndContentFilled}
          className={`w-full rounded-[8px] py-4 text-SUIT_18 font-extrabold text-white ${
            isTitleAndContentFilled ? "bg-question-main" : "bg-ui-muted"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default QuestionPostSecondPage;
