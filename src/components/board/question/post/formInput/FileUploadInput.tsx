import QnaPostFileUpload from "../QnaPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      <span className="font-pretendard-semibold mr-1.5 text-lg">파일</span>
      <QnaPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
