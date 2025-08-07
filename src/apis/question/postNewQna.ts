// src/apis/questionBoard/postNewQna.ts
import { apiClient } from "../appClient";

interface QnaPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags?: string[];
  questionPresetTags?: string[];
  reward?: number;
  isPrivate?: boolean;
  mediaFiles?: File[];
}

export default async function postNewQna(data: QnaPostFormData) {
  const formData = new FormData();

  const tagMapping: { [key: string]: string } = {
    "수업 외 내용": "OUT_OF_CLASS",
    "개념 모름": "UNKNOWN_CONCEPT",
    "더 나은 풀이": "BETTER_SOLUTION",
    "시험 대비": "EXAM_PREPARATION",
    "자료 요청": "DOCUMENT_REQUEST",
    "공부 팁": "STUDY_TIPS",
    "조언 구함": "ADVICE_REQUEST",
  };

  // 필수 항목 추가
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("subject", data.subject);

  // 선택 항목 추가
  if (data.reward !== undefined) {
    formData.append("rewardYeopjeon", data.reward.toString());
  }
  if (data.isPrivate !== undefined) {
    formData.append("isPrivate", data.isPrivate.toString());
  }

  // 정적 태그
  if (data.questionPresetTags && data.questionPresetTags.length > 0) {
    data.questionPresetTags.forEach(tag => {
      const englishTag = tagMapping[tag]; // 한국어 태그를 영어로 변환
      if (englishTag) formData.append("questionPresetTags", englishTag);
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
    const response = await apiClient.post("/api/question/post", formData, {
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
