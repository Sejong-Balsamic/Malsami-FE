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
      className={`relative h-[50px] w-[50px] cursor-pointer transition-all duration-300 ${
        isExpanded ? "h-[196px]" : ""
      }`}
      onClick={toggleExpand}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleExpand()}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className="shadow-gray absolute left-0 top-0 h-[50px] w-[50px] rounded-full bg-white shadow-md" />

      <FABIcon width="50px" height="50px" className="absolute left-0 top-0" />

      {isExpanded && (
        <>
          <div className="shadow-gray absolute bottom-[25px] h-[147px] w-[50px] rounded-t-full bg-white shadow-md" />

          <FABIcon width="50px" height="50px" className="absolute left-0 top-0" />

          <DocumentIcon
            width="40px"
            height="40px"
            className="absolute bottom-[70px] left-[5px] cursor-pointer"
            onClick={handleDocumentClick}
          />

          <QuestionIcon
            width="40px"
            height="40px"
            className="absolute bottom-[125px] left-[5px] cursor-pointer"
            onClick={handleQuestionClick}
          />
        </>
      )}
    </div>
  );
}

export default FabButton;
