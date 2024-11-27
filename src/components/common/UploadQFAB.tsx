"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Upload from "@/../public/icons/Upload.svg";

function UploadQFAB() {
  const router = useRouter();

  const handleQuestionClick = () => {
    router.push("/board/question/post");
  };

  return (
    <div className="z-0">
      <button className="relative z-50 h-[50px] w-[50px] rounded-full bg-[#03b89e]" onClick={handleQuestionClick}>
        <Upload />
      </button>
    </div>
  );
}

export default UploadQFAB;
