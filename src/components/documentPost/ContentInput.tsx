/* eslint-disable react/require-default-props */
import CommonTextarea from "@/components/common/CommonTextarea";
import Image from "next/image";

interface ContentTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPrivate?: boolean;
  onTogglePrivate?: () => void;
}

function ContentInput({ value, onChange, isPrivate = false, onTogglePrivate = undefined }: ContentTextareaProps) {
  const MAX_LENGTH = 2000;

  // textarea 핸들러 + 글자수 제한
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    onChange(e);
  };

  return (
    <div>
      <div className="flex flex-col">
        <h2 className="mb-2 text-SUIT_16 font-medium text-black">본문</h2>

        <div className="flex justify-between">
          <span className="mr-4 text-SUIT_14 font-medium text-tag-custom-text">
            최대 {MAX_LENGTH}자까지 작성할 수 있어요.
          </span>

          {/* 익명 설정 */}
          {onTogglePrivate && (
            <div className="flex items-center">
              <button type="button" onClick={onTogglePrivate} className="mr-1">
                <Image
                  src={
                    isPrivate ? "/icons/chaetaekCheckboxCheckedDocument.svg" : "/icons/chaetaekCheckboxUnchecked.svg"
                  }
                  alt="익명 체크박스"
                  width={16}
                  height={16}
                />
              </button>
              <span
                className={`font-suit-medium text-[14px] ${isPrivate ? "text-document-main" : "text-ui-muted-soft"}`}
              >
                익명
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="relative mt-3">
        <CommonTextarea
          name="content"
          value={value}
          onChange={handleChange}
          placeholder="본문을 작성해주세요."
          maxLength={MAX_LENGTH}
          required
          contentType="document"
          className="min-h-[226px]"
        />

        {/* 글자 수 카운터 — 자료 영역이므로 document-main으로 통일 */}
        <div className="absolute bottom-4 right-4 text-right text-SUIT_12 leading-none">
          <span className="font-semibold text-document-main">{value.length}</span>
          <span className="font-medium text-ui-muted"> / {MAX_LENGTH}</span>
        </div>
      </div>
    </div>
  );
}

export default ContentInput;
