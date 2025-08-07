import DocPostFileUpload from "./DocPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      <div className="flex items-center justify-between">
        <h2 className="font-suit-medium mb-3 text-base">자료</h2>

        <span className="text-sm text-gray-500">{mediaFiles.length} / 10개</span>
      </div>
      <DocPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
