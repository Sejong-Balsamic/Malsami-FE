// 질문 등록 API 호출

import { apiClient } from "../../apis/clients/appClient";
import createFormData from "./FormDataUtil";

const API_URL = "/api/questions/post";

const postQuestion = async (
  data: {
    memberId: string;
    title: string;
    content: string;
    subject: string;
    questionPresetTagSet: string[];
    customTagSet: string[];
    rewardYeopjeon?: number;
    isPrivate?: boolean;
  },
  mediaFiles: File[],
) => {
  try {
    const formData = createFormData(data, mediaFiles);
    const response = await apiClient.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting question:", error);
    throw error;
  }
};

export default postQuestion;
