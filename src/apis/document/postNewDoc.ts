// src/apis/questionBoard/postNewQna.ts
import { apiClient } from "../clients/appClient";

interface DocPostFormData {
  title: string; // 필수
  content: string; // 필수
  subject: string; // 필수
  categoryTags: string[]; // 필수
  customTags: string[];
  studyYear: number;
  isPrivate: boolean;
  mediaFiles: File[]; // File 배열로 정의
}

export default async function postNewDoc(data: DocPostFormData) {
  const formData = new FormData();

  const tagMapping: { [key: string]: string } = {
    강의자료: "DOCUMENT",
    "과제 기출": "PAST_EXAM",
    해설: "SOLUTION",
  };

  // 필수 항목 추가
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("subject", data.subject);

  // 선택 항목 추가
  if (data.studyYear) {
    formData.append("studyYear", data.studyYear.toString());
  }
  if (data.isPrivate !== undefined) {
    formData.append("isDepartmentPrivate", data.isPrivate.toString());
  }

  // 카테고리
  if (data.categoryTags && data.categoryTags.length > 0) {
    data.categoryTags.forEach(tag => {
      const englishTag = tagMapping[tag]; // 한국어 태그를 영어로 변환
      if (englishTag) formData.append("documentTypeSet", englishTag);
    });
  }

  // 커스텀 태그
  if (data.customTags && data.customTags.length > 0) {
    data.customTags.forEach(tag => {
      formData.append("customTags", tag);
    });
  }

  // 첨부 파일
  if (data.mediaFiles && data.mediaFiles.length > 0) {
    data.mediaFiles.forEach(file => {
      formData.append("attachmentFiles", file);
    });
  }

  try {
    const response = await apiClient.post("/api/document/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Q&A 게시글 등록 중 오류 발생:", error);
    throw error;
  }
}
