import DocPostFileUpload from "../DocPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-pretendard-semibold mr-1.5 text-lg">파일</span>
          <span className="font-pretendard-medium text-xs text-custom-blue-500">
            여러장의 이미지는 zip파일로 업로드됩니다.
          </span>
        </div>
        <span className="text-sm text-gray-500">{mediaFiles.length} / 10개</span>
      </div>
      <DocPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
