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
  answerPosts: {
    member: {
      uuidNickname: string;
      major: string;
    };
    content: string;
  }[];
}

// 특정 질문 글을 조회하는 함수
export default async function getQuestionDetails(postId: string): Promise<QuestionDtoResponse> {
  try {
    // `FormData` 객체를 생성해 `postId` 추가
    const formData = new FormData();
    formData.append("postId", postId);

    // 특정 질문 글을 조회하기 위한 POST 요청을 보냄 (multipart/form-data 사용)
    const response = await apiClient.post<QuestionDtoResponse>("/api/question/get", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 응답 데이터를 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 콘솔에 에러를 출력
    console.error("질문 조회 중 오류 발생:", error);
    throw error;
  }
}
