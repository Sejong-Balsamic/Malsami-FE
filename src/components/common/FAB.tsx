"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FABIcon from "../../../public/icons/FAB.svg";
import DocumentIcon from "../../../public/icons/Document.svg";
import QuestionIcon from "../../../public/icons/Question.svg";

function FabButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleDocumentClick = () => {
    router.push("/document/post"); // DocumentIcon 클릭 시 이동할 경로 (확정 아님)
  };

  const handleQuestionClick = () => {
    router.push("/questions/post"); // QuestionIcon 클릭 시 이동할 경로 (확정 아님)
  };

  return (
    <div
      className={`relative w-[50px] h-[50px] cursor-pointer transition-all duration-300 ${
        isExpanded ? "h-[196px]" : ""
      }`}
      onClick={toggleExpand}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleExpand()}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      {isExpanded && (
        <>
          <div className="absolute w-[50px] h-[147px] bottom-[25px] bg-black rounded-t-full" />

          <FABIcon width="50px" height="50px" className="absolute top-0 left-0" />

          <DocumentIcon
            width="40px"
            height="40px"
            className="absolute left-[5px] bottom-[70px] cursor-pointer"
            onClick={handleDocumentClick}
          />

          <QuestionIcon
            width="40px"
            height="40px"
            className="absolute left-[5px] bottom-[125px] cursor-pointer"
            onClick={handleQuestionClick}
          />
        </>
      )}
      {!isExpanded && <FABIcon width="50px" height="50px" className="absolute top-0 left-0" />}
    </div>
  );
}

export default FabButton;
