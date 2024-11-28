import { apiClient } from "@/apis/clients/appClient";

interface FilteringDocListParams {
  subject?: string; // 교과목명 (선택)
  documentTypes?: string[]; // 태그 필터링 (최대 2개, 선택)
  faculty?: string; // 단과대 필터링 (선택)
  postTier?: string; // 자료 등급별 필터링 (선택)
  sortType?: string; // 정렬 기준 (default = 최신순)
  pageNumber?: number; // 페이지 번호 (default = 0)
  pageSize?: number; // 한 페이지 조회 글 개수 (default = 30)
}

export default async function getFilteringDocs(params: FilteringDocListParams) {
  // 한국어 -> 영어 매핑 객체
  const sortOptionMapping: { [key: string]: string } = {
    최근순: "LATEST",
    "좋아요 많은 순": "MOST_LIKED",
    "조회수 높은 순": "VIEW_COUNT",
  };

  const tagMapping: { [key: string]: string } = {
    "강의 자료": "DOCUMENT",
    "과제 기출": "PAST_EXAM",
    해설: "SOLUTION",
  };

  const tierMapping: { [key: string]: string } = {
    천민: "CHEONMIN",
    중인: "JUNGIN",
    양반: "YANGBAN",
    왕: "KING",
  };

  try {
    const formData = new FormData();
    if (params.subject) formData.append("subject", params.subject); // 교과목명
    if (params.documentTypes?.length) {
      params.documentTypes.forEach(tag => {
        const mappedTag = tagMapping[tag]; // 배열의 각 값에 대해 매핑
        if (mappedTag) {
          formData.append("documentTypes", mappedTag);
        }
      });
    }
    if (params.faculty) formData.append("faculty", params.faculty); // 단과대
    if (params.postTier) formData.append("postTier", tierMapping[params.postTier]); // 자료 등급별
    if (params.sortType) formData.append("sortType", sortOptionMapping[params.sortType]); // 정렬 기준

    formData.append("pageNumber", params.pageNumber?.toString() || "0"); // 페이지 번호
    formData.append("pageSize", params.pageSize?.toString() || "12"); // 페이지 크기

    const response = await apiClient.post("/api/document/filter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.documentPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("내 전공 관련 자료 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}