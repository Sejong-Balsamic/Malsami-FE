import { apiClient } from "@/apis/appClient";
import { DocTypesKey } from "@/types/docTypes";
import { PostTiersKey } from "@/types/postTiers";
import { CommonSortType } from "@/types/api/constants/sortTypes";

interface FilteringDocListParams {
  subject?: string; // 교과목명 (선택)
  docTypes?: DocTypesKey[]; // 태그 필터링 (최대 2개, 선택)
  faculty?: string; // 단과대 필터링 (선택)
  postTier?: PostTiersKey; // 자료 등급별 필터링 (선택)
  sortType?: CommonSortType; // 정렬 기준 (default = 최신순)
  pageNumber?: number; // 페이지 번호 (default = 0)
  pageSize?: number; // 한 페이지 조회 글 개수 (default = 30)
}

export default async function getFilteringDocs(params: FilteringDocListParams) {
  const formData = new FormData();

  // 기본 필수 파라미터 설정
  formData.append("pageNumber", (params.pageNumber ?? 0).toString()); // 페이지 번호
  formData.append("pageSize", (params.pageSize ?? 15).toString()); // 페이지 크기

  // 선택적 파라미터 설정
  // null과 undefined를 빈 문자열로 처리하는 기본값을 설정하기 위해 삼항 연산자, 널 병합 연산자 사용
  formData.append("subject", params.subject ?? ""); // 교과목명
  if (params.docTypes?.length) {
    params.docTypes.forEach(docType => {
      formData.append("documentTypes", docType);
    });
  }
  formData.append("faculty", params.faculty ?? ""); // 단과대
  formData.append("postTier", params.postTier ?? ""); // 자료 등급별
  formData.append("sortType", params.sortType ?? ""); // 정렬 기준

  // API 호출
  try {
    const response = await apiClient.post("/api/document/filter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.documentPostsPage; // API 호출 결과만 반환
  } catch (error) {
    console.error("내 전공 관련 자료 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
