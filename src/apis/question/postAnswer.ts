import { apiClient } from "../clients/appClient";

interface PostAnswerFormData {
  questionPostId: string;
  content: string;
  isPrivate?: boolean;
  mediaFiles?: File[];
}

export default async function postAnswer(data: PostAnswerFormData) {
  const formData = new FormData();

  // 필수 항목 추가
  formData.append("questionPostId", data.questionPostId);
  formData.append("content", data.content);

  // 선택 항목 추가
  if (data.isPrivate !== undefined) {
    formData.append("isPrivate", data.isPrivate.toString());
  }

  // 첨부 파일 추가 (최대 3개 제한)
  if (data.mediaFiles && data.mediaFiles.length > 0) {
    if (data.mediaFiles.length > 3) {
      throw new Error("최대 3개의 파일만 업로드할 수 있습니다.");
    }
    data.mediaFiles.forEach(file => {
      formData.append("mediaFiles", file);
    });
  }

  try {
    const response = await apiClient.post("/api/answer/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("답변 등록 중 오류 발생:", error);
    throw error;
  }
}
