import DocPostFileUpload from "./DocPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      <div className="mb-3 flex flex-col">
        <h2 className="mb-2 text-SUIT_16 font-medium text-black">자료</h2>
        <span className="mr-4 text-SUIT_14 font-medium text-[#898989]">최대 200MB까지 올릴 수 있어요.</span>
      </div>
      <DocPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />
    </div>
  );
}
