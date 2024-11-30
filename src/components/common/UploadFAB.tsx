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
      {isDivVisible && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          role="button"
          tabIndex={0}
          onClick={() => setIsDivVisible(false)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              setIsDivVisible(false);
            }
          }}
          aria-label="Close Overlay"
        />
      )}
      <button
        type="button"
        className="relative z-50 h-[50px] w-[50px] rounded-full bg-[#03b89e] shadow-lg"
        onClick={toggleDivVisibility}
      >
        <Upload />
      </button>
      {isDivVisible && (
        <div className="absolute bottom-[138px] right-0 z-40 flex flex-col items-center space-y-[10px]">
          <div className="flex items-center gap-[10px]">
            <span className="font-pretendard-medium w-[50px] text-right text-[14px] text-white">
              질문
              <br />
              올리기
            </span>
            <button
              type="button"
              className="flex h-[50px] w-[50px] rounded-full bg-white shadow"
              onClick={handleQuestionClick}
            >
              <QuestionIcon className="h-[50px] w-[50px] text-[#03b89e]" />
            </button>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="font-pretendard-medium w-[50px] text-right text-[14px] text-white">
              자료
              <br />
              올리기
            </span>
            <button
              type="button"
              className="flex h-[50px] w-[50px] rounded-full bg-white shadow"
              onClick={handleDocumentClick}
            >
              <DocumentIcon className="h-[50px] w-[50px] text-[#03b89e]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFAB;
