import React from "react";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

function DocPostFileUpload({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      {/* 선택된 파일들 표시 */}
      {mediaFiles.length > 0 && (
        <ul className="mt-2 text-sm text-gray-500">
          {mediaFiles.map(file => (
            <li key={file.name} className="mb-2 flex items-center justify-between">
              <span className="flex-1 truncate">{file.name}</span> {/* 파일 이름이 길면 말줄임 처리 */}
              <button
                type="button"
                onClick={() => onFileDelete(file.name)}
                className="font-pretendard-semibold ml-4 text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* 파일 선택 버튼 */}
      <button
        type="button"
        onClick={() => document.getElementById("file-input")?.click()}
        className="font-pretendard-medium mt-2 flex h-36 w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#F6F7FB] text-base text-[#939393]"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center text-[#939393]">
            <span className="text-3xl text-[#939393]">+&nbsp;</span>
            파일 불러오기
          </div>
          <div className="my-2 text-sm text-gray-500">파일당 최대 30mb이하 (영상파일은 200mb 이하)</div>
          <div className="text-sm text-gray-500">첨부파일 10개 이하까지 업로드 가능합니다.</div>
        </div>
      </button>

      {/* 숨겨진 파일 입력 */}
      <input type="file" id="file-input" multiple onChange={onFileChange} className="hidden" />
    </div>
  );
}

export default DocPostFileUpload;
