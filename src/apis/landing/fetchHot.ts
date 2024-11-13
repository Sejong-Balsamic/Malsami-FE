import axios from "axios";
import { QuestionPost } from "@/types/questionPost.types";

const API_URL = "https://api.sejong-malsami.co.kr/api/landing/popular/question";

export const fetchWeeklyHotQuestions = async (): Promise<QuestionPost[]> => {
  try {
    const formData = new FormData();
    formData.append("pageSize", "10");

    const response = await axios.post(`${API_URL}/weekly`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.questionPostsPage.content.map((post: any, index: number) => ({
      postId: post.questionPostId || index.toString(),
      title: post.title,
      subject: post.subject,
      JiJeongTags: post.questionPresetTags || [],
      rewardYeopjeon: post.rewardYeopjeon || 0,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
    }));
  } catch (error) {
    console.error("Failed to fetch weekly hot questions:", error);
    throw error;
  }
};

export const fetchDailyHotQuestions = async (): Promise<QuestionPost[]> => {
  try {
    const formData = new FormData();
    formData.append("pageSize", "10");

    const response = await axios.post(`${API_URL}/daily`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.questionPostsPage.content.map((post: any, index: number) => ({
      postId: post.questionPostId || index.toString(),
      title: post.title,
      subject: post.subject,
      JiJeongTags: post.questionPresetTags || [],
      rewardYeopjeon: post.rewardYeopjeon || 0,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
    }));
  } catch (error) {
    console.error("Failed to fetch daily hot questions:", error);
    throw error;
  }
};
