import QnaPostFileUpload from "@/components/questionPost/QnaPostFileUpload";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

export default function FileUploadInput({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return <QnaPostFileUpload mediaFiles={mediaFiles} onFileChange={onFileChange} onFileDelete={onFileDelete} />;
}
