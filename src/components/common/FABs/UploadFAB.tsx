"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DocumentIcon from "@/../public/icons/Document.svg";
import QuestionIcon from "@/../public/icons/Question.svg";
import Upload from "@/../public/icons/Upload.svg";

function UploadFAB() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const router = useRouter();

  const toggleDivVisibility = () => {
    setIsDivVisible(prev => !prev);
  };

  const checkAccessTokenAndNavigate = (path: string) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  const handleDocumentClick = () => {
    checkAccessTokenAndNavigate("board/document/post");
  };

  const handleQuestionClick = () => {
    checkAccessTokenAndNavigate("/board/question/post");
  };

  return (
    <div className="relative z-0">
      {isDivVisible && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
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
      <div className="relative">
        <button
          type="button"
          className="relative z-[70] h-[50px] w-[50px] rounded-full bg-[#03b89e] shadow-lg"
          onClick={toggleDivVisibility}
        >
          <Upload />
        </button>
        {isDivVisible && (
          <div className="absolute bottom-[70px] right-0 z-[65] flex flex-col items-center space-y-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="font-pretendard-medium w-[70px] text-right text-[14px] text-white">질문 올리기</span>
              <button
                type="button"
                className="flex h-[50px] w-[50px] rounded-full bg-white shadow"
                onClick={handleQuestionClick}
              >
                <QuestionIcon className="h-[50px] w-[50px] text-[#03b89e]" />
              </button>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-pretendard-medium w-[70px] text-right text-[14px] text-white">자료 올리기</span>
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
    </div>
  );
}

export default UploadFAB;
