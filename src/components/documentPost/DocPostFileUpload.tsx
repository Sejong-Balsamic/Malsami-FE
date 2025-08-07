import Image from "next/image";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

function DocPostFileUpload({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="border-ui-border flex flex-col gap-y-[20px] rounded-[14px] border-2 px-4 py-[18px]">
      {/* 파일 목록 */}
      {mediaFiles.map(file => (
        <div key={file.name} className="flex items-center justify-between">
          {/* 파일 아이콘 + 이름 */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/icons/Document.svg" alt="file" width={20} height={20} />
            <span className="truncate text-SUIT_14 font-medium text-black">{file.name}</span>
          </div>

          {/* 삭제 버튼 */}
          <button type="button" onClick={() => onFileDelete(file.name)} aria-label="파일 삭제">
            <Image src="/icons/deleteGray.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      ))}

      {/* +버튼 (아이콘만 표시) */}
      <label htmlFor="doc-file-upload" className="flex cursor-pointer items-center justify-center">
        <input id="doc-file-upload" type="file" multiple onChange={onFileChange} className="hidden cursor-pointer" />
        <Image
          src="/icons/interface-add-circle--button-remove-cross-add-buttons-plus-circle--Streamline-Core.svg"
          alt="plus"
          width={20}
          height={20}
        />
      </label>
    </div>
  );
}

export default DocPostFileUpload;
