import { apiClient } from "../clients/appClient";

interface QuestionDtoResponse {
  questionPost: {
    createdDate: string;
    questionPostId: string;
    member: {
      uuidNickname: string;
    };
    title: string;
    content: string;
    subject: string;
    questionPresetTags: string[];
    viewCount: number;
    likeCount: number;
    answerCount: number;
    commentCount: number;
    rewardYeopjeon: number;
    isPrivate: boolean;
  };
}

// 특정 질문 글을 조회하는 함수
export default async function getQuestionDetails(postId: string): Promise<QuestionDtoResponse> {
  try {
    // 특정 질문 글을 조회하기 위한 POST 요청을 보냄
    const response = await apiClient.post<QuestionDtoResponse>("/api/question/get", { postId });

    // 응답 데이터를 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 콘솔에 에러를 출력
    console.error("질문 조회 중 오류 발생:", error);
    throw error;
  }
}
