"use client";

import React from "react";

interface SubjectTagProps {
  // eslint-disable-next-line react/require-default-props
  subjectName?: string;
  type: "question" | "document";
}

/**
 * 과목명 태그 컴포넌트
 * @param subjectName - 과목명 (없으면 "과목 없음")
 * @param type - 게시글 타입 (question | document) 에 따라 태그 색상이 달라집니다.
 */
export default function SubjectTag({ subjectName = "과목 없음", type = "question" }: SubjectTagProps) {
  const text = subjectName ?? "과목 없음";
  const bgColorClass = type === "question" ? "bg-question-main" : "bg-document-main";

  return (
    <div className={`inline-flex items-center justify-center rounded px-1.5 py-1 ${bgColorClass}`}>
      <span className="truncate text-SUIT_12 font-medium text-white" style={{ maxWidth: "120px" }}>
        {text}
      </span>
    </div>
  );
}
