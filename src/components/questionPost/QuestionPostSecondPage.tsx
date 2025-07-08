import { useState, useEffect } from "react";
import { SecondPageProps } from "./QuestionPostTypes";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FileUploadInput from "./FileUploadInput";
import PrivateSettingInput from "./PrivateSettingInput";
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
  const [localReward, setLocalReward] = useState(formData.reward);

  const emitChange = (field: string, value: string | number) => {
    const input = document.createElement("input");
    input.name = field;
    // @ts-ignore - value는 string | number 모두 허용
    input.value = value;
    onFormChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
  };

  // localReward가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    if (localReward !== formData.reward) emitChange("reward", localReward);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localReward]);

  // 제목·본문 입력 핸들러 (name 속성 자동 지정)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => emitChange("title", e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => emitChange("content", e.target.value);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        {/* 제목 */}
        <TitleInput value={formData.title} onChange={handleTitleChange} />
        {/* 질문 내용 */}
        <ContentInput value={formData.content} onChange={handleContentChange} />
        {/* 파일 첨부 */}
        <FileUploadInput mediaFiles={formData.mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />

        {/* 엽전 현상금 */}
        <div>
          <h2 className="font-suit-medium mb-3 text-base">엽전 현상금</h2>
          <YeopjeonSelector value={localReward} onChange={value => setLocalReward(value)} />
        </div>

        {/* 비공개 설정 */}
        <div>
          <PrivateSettingInput isPrivate={formData.isPrivate} onToggle={onPrivateToggle} />
        </div>
      </div>

      {/* 작성완료 버튼 */}
      <div className="mb-[60px] mt-auto">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isTitleAndContentFilled}
          className={`w-full rounded-[8px] py-4 text-SUIT_18 font-extrabold text-white ${
            isTitleAndContentFilled ? "bg-[#00E271]" : "bg-[#D1D1D1]"
          }`}
        >
          작성완료
        </button>
      </div>
    </div>
  );
}

export default QuestionPostSecondPage;
