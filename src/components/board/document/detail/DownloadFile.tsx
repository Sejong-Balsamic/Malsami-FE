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
  // 파일 크기를 MB로 변환
  return (fileSize / (1024 * 1024)).toFixed(1); // MB 단위, 소수점 1자리 표시
}

function DownloadFile({ documentFiles }: DownloadFileProps) {
  return (
    <div className="my-[30px] flex flex-col gap-4">
      {documentFiles.map(file => (
        <div
          key={file.documentFileId} // documentFileId를 key로 사용
          className="flex h-[58px] w-[270px] items-center justify-between rounded-[10px] bg-[#f7f8fb] p-[14px]"
        >
          <div className="flex flex-col">
            <div className="font-pretendard-medium text-[12px]">{file.filePath}</div>
            <div className="font-pretendard-medium text-[12px] text-[#737373]">{formatFileSize(file.fileSize)}MB</div>
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
