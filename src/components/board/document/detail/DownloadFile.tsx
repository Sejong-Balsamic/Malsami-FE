import Image from "next/image";

function DownloadFile() {
  return (
    <div className="my-[30px] flex h-[58px] w-[270px] items-center justify-between rounded-[10px] bg-[#f7f8fb] p-[14px]">
      <div className="flex flex-col">
        <div className="font-pretendard-medium text-[12px]">첨부파일 이름.pdf</div>
        <div className="font-pretendard-medium text-[12px] text-[#737373]">3.3MB</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <Image src="/icons/Download.svg" alt="Download" width={12} height={15} />
        <div className="font-pretendard-medium text-[12px] text-[#737373]">다운 25회</div>
      </div>
    </div>
  );
}

export default DownloadFile;
