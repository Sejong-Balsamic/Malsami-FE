"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Upload from "@/../public/icons/Upload.svg";

interface UploadDocFABProps {
  isFABVisible: boolean;
}

function UploadDocumentFAB({ isFABVisible }: UploadDocFABProps) {
  const router = useRouter();

  const handleQuestionClick = () => {
    if (isFABVisible) {
      router.push("/board/document/post");
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-[70] transform transition-all duration-500 ${
        isFABVisible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
      }`}
    >
      <button
        type="button"
        className="relative h-[50px] w-[50px] rounded-full bg-[#03b89e]"
        onClick={handleQuestionClick}
        disabled={!isFABVisible} // 클릭 비활성화 추가
      >
        <Upload />
      </button>
    </div>
  );
}

export default UploadDocumentFAB;
