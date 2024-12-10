import Image from "next/image";

interface DocumentFile {
  documentFileId: string;
  filePath: string;
  fileSize: number;
  downloadCount: number;
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
  return (
    <div className="my-[30px] flex flex-col gap-4">
      {documentFiles.map(file => (
        <div
          key={file.documentFileId} // documentFileId를 key로 사용
          className="flex h-auto w-auto items-center justify-between rounded-[10px] bg-[#f7f8fb] p-[14px]"
        >
          <div className="flex flex-col">
            <div className="font-pretendard-medium text-[12px]">{file.filePath}</div>
            <div className="font-pretendard-medium text-[12px] text-[#737373]">{formatFileSize(file.fileSize)}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image src="/icons/Download.svg" alt="Download" width={12} height={15} />
            <div className="font-pretendard-medium text-[12px] text-[#737373]">다운 {file.downloadCount}회</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DownloadFile;
