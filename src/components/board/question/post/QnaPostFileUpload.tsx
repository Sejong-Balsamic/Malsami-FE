import React from "react";

interface FileUploadProps {
  mediaFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
}

function QnaPostFileUpload({ mediaFiles, onFileChange, onFileDelete }: FileUploadProps) {
  return (
    <div className="mb-[26px] block">
      {/* 선택된 파일들 표시 */}
      {mediaFiles.length > 0 && (
        <ul className="mt-2 text-sm text-gray-500">
          {mediaFiles.map(file => (
            <li key={file.name} className="mb-2 flex justify-between">
              {file.name}
              <button
                type="button"
                onClick={() => onFileDelete(file.name)}
                className="ml-2 text-red-500 hover:text-red-700"
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
          <div className="mt-2 text-sm text-gray-500">JPEG, PNG 이미지 파일만 업로드할 수 있습니다.</div>
          <div className="text-sm text-gray-500">최대 3개의 파일까지 업로드 가능합니다.</div>
        </div>
      </button>

      {/* 숨겨진 파일 입력 */}
      <input type="file" id="file-input" multiple onChange={onFileChange} className="hidden" />
    </div>
  );
}

export default QnaPostFileUpload;
