// 가짜가짜가짜가짜

import { apiClient } from "@/apis/clients/appClient";

interface GetMyListParams {
  listType: "comment" | "document" | "answer" | "question"; // 리스트 유형
}

export default async function getMyList(params: GetMyListParams) {
  try {
    const { listType } = params;

    const response = await apiClient.get("/api/member/comment", {
      headers: {
        "X-List-Type": listType, // 헤더에 리스트 유형 설정
      },
    });

    return response.data; // API 호출 결과 반환
  } catch (error) {
    console.error(`리스트(${params.listType})를 가져오는 중 오류 발생:`, error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
