import { useState } from "react";
import Image from "next/image";
import DownloadCheckModal from "./DownloadCheckModal";

interface DocumentFile {
  documentFileId: string;
  originalFileName: string;
  fileSize: number;
  totalDownloadCount: number;
}

interface DownloadFileProps {
  documentFiles: DocumentFile[];
}

function formatFileSize(fileSize: number): string {
  if (fileSize < 1024) {
    // B 단위
    return `${fileSize} B`;
    // eslint-disable-next-line no-else-return
  } else if (fileSize < 1024 * 1024) {
    // KB 단위
    return `${(fileSize / 1024).toFixed(1)} KB`;
  } else if (fileSize < 1024 * 1024 * 1024) {
    // MB 단위
    return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    // GB 단위
    return `${(fileSize / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}

function DownloadFile({ documentFiles }: DownloadFileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    documentFileId: string;
    originalFileName: string;
  } | null>(null);

  const handleDownloadClick = (file: DocumentFile) => {
    setSelectedFile({
      documentFileId: file.documentFileId,
      originalFileName: file.originalFileName,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="my-[30px] flex flex-col gap-4">
      {documentFiles.map(file => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          key={file.documentFileId} // documentFileId를 key로 사용
          className="flex h-auto w-auto items-center justify-between rounded-[10px] bg-[#f7f8fb] p-[14px]"
          onClick={() => handleDownloadClick(file)} // 버튼 클릭 시 모달 열기
        >
          <div className="flex flex-col">
            <div className="font-pretendard-medium text-[12px]">{file.originalFileName}</div>
            <div className="font-pretendard-medium text-[12px] text-[#737373]">{formatFileSize(file.fileSize)}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image src="/icons/Download.svg" alt="Download" width={12} height={15} />
            <div className="font-pretendard-medium text-[12px] text-[#737373]">다운 {file.totalDownloadCount}회</div>
          </div>
        </div>
      ))}

      {/* DownloadCheckModal 모달 */}
      {isModalOpen && selectedFile && (
        <DownloadCheckModal
          isOpen={isModalOpen}
          onClose={closeModal}
          documentFileId={selectedFile.documentFileId}
          originalFileName={selectedFile.originalFileName}
        />
      )}
    </div>
  );
}

export default DownloadFile;
