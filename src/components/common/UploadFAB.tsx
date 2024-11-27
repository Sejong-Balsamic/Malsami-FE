"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Upload from "@/../public/icons/Upload.svg";
import DocumentIcon from "@/../public/icons/Document.svg";
import QuestionIcon from "@/../public/icons/Question.svg";

function UploadFAB() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const router = useRouter();

  const toggleDivVisibility = () => {
    setIsDivVisible(prev => !prev);
  };

  const handleDocumentClick = () => {
    router.push("board/document/post");
  };

  const handleQuestionClick = () => {
    router.push("/board/question/post");
  };

  return (
    <div className="z-0">
      <button className="relative z-50 h-[50px] w-[50px] rounded-full bg-[#03b89e]" onClick={toggleDivVisibility}>
        <Upload />
      </button>
      {isDivVisible && (
        <>
          {/* 사각형 배경 */}
          <div className="absolute bottom-[106px] right-0 z-40 h-[119px] w-[50px] bg-white shadow-lg" />

          {/* 버튼들 */}
          <div className="absolute bottom-[138px] right-0 z-40 flex flex-col items-center space-y-[10px]">
            <button className="flex h-[50px] w-[50px] rounded-full bg-white shadow" onClick={handleQuestionClick}>
              <QuestionIcon className="h-[50px] w-[50px] text-[#03b89e]" />
            </button>

            <button className="flex h-[50px] w-[50px] rounded-full bg-white shadow" onClick={handleDocumentClick}>
              <DocumentIcon className="h-[50px] w-[50px] text-[#03b89e]" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadFAB;
