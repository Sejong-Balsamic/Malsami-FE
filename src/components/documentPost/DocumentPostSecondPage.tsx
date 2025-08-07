import TitleInput from "@/components/documentPost/TitleInput";
import ContentInput from "@/components/documentPost/ContentInput";
import FileUploadInput from "@/components/documentPost/FileUploadInput";
import { DocumentSecondPageProps } from "./DocumentPostTypes";

export default function DocumentPostSecondPage({
  formData,
  onFormChange,
  onFileChange,
  onFileDelete,
  onSubmit,
  isFormValid,
}: DocumentSecondPageProps): JSX.Element {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-7">
        <TitleInput value={formData.title} onChange={onFormChange} />
        <ContentInput value={formData.content} onChange={onFormChange} />
        <FileUploadInput mediaFiles={formData.mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
      </div>
      <div className="mb-[60px] mt-auto">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`w-full rounded-[8px] py-4 text-SUIT_18 font-extrabold text-white ${
            isFormValid ? "bg-document-main" : "bg-ui-muted"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
}
