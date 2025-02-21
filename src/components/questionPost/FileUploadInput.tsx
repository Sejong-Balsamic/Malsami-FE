import QnaPostFileUpload from "@/components/question/questionPost/QnaPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      <div className="flex items-center justify-between">
        <span className="font-pretendard-semibold mr-1.5 text-lg">파일</span>
        <span className="text-sm text-gray-500">{mediaFiles.length} / 10개</span>
      </div>
      <QnaPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
