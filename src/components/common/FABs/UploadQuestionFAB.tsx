"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Write from "@/../public/icons/write.svg";

interface UploadQFABProps {
  isFABVisible: boolean;
}

function UploadQuestionFAB({ isFABVisible }: UploadQFABProps) {
  const router = useRouter();

  const handleQuestionClick = () => {
    if (isFABVisible) {
      router.push("/board/question/post");
    }
  };

  return (
    <div
      className={`fixed bottom-[70px] right-[10px] z-[70] transform transition-all duration-500 ${
        isFABVisible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
      }`}
    >
      <button type="button" onClick={handleQuestionClick} disabled={!isFABVisible} className="relative">
        <Write />
      </button>
    </div>
  );
}

export default UploadQuestionFAB;
