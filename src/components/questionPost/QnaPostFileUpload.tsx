import Image from "next/image";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

function QnaPostFileUpload({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {/* 파일 추가 버튼 */}
      <label
        htmlFor="file-upload"
        className="relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-[8px] border-2 border-dashed border-ui-divider"
      >
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
        />
        <Image
          src="/icons/interface-add-circle--button-remove-cross-add-buttons-plus-circle--Streamline-Core.svg"
          alt="plus"
          width={20}
          height={20}
        />
      </label>

      {/* 이미지 미리보기 */}
      {mediaFiles.map(file => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <div
            key={file.name}
            className="relative h-[100px] w-[100px] overflow-hidden rounded-[8px] border-2 border-question-main bg-gray-300"
          >
            <img src={imageUrl} alt={file.name} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onFileDelete(file.name)}
              className="absolute right-1 top-1"
              aria-label="이미지 삭제"
            >
              <Image src="/icons/basic-delete-circle.svg" alt="delete" width={20} height={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default QnaPostFileUpload;
