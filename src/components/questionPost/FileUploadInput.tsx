import QnaPostFileUpload from "@/components/questionPost/QnaPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div>
      <h2 className="font-suit-medium text-base">이미지</h2>

      <div className="flex items-center justify-between">
        <span className="font-suit-medium text-sm text-[#898989]">최대 OOOMB까지 업로드할 수 있어요.</span>
        <span className="text-sm text-gray-500">
          <span className={mediaFiles.length > 0 ? "text-[#00E271]" : "text-gray-500"}>{mediaFiles.length} </span>/ 10개
        </span>
      </div>
      <QnaPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
