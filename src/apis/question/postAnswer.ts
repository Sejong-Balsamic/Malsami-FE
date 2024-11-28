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

  // 첨부 파일 
  if (data.mediaFiles && data.mediaFiles.length > 0) {
    data.mediaFiles.forEach(file => {
      formData.append("attachmentFiles", file);
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
