import { ChaetaekStatusKey } from "@/lib/constants/chaetaekStatus";
import { QnaPresetTagsKey } from "@/lib/constants/qnaPresetTags";
import { SortTypeKey } from "@/lib/constants/sortTypes";
import { apiClient } from "../clients/appClient";

interface GetCategoryQnasProps {
  subject?: string; // 교과목명 필터링
  minYeopjeon?: number; // 엽전 현상금 최소 개수
  maxYeopjeon?: number; // 엽전 현상금 최대 개수
  qnaPresetTags?: QnaPresetTagsKey[]; // 정적 태그 필터링
  faculty?: string; // 단과대별 필터링
  chaetaekStatus?: ChaetaekStatusKey; // 채택여부 필터링
  sortType?: SortTypeKey; // 정렬 조건
  pageNumber?: number; // 조회하고 싶은 페이지 번호 (기본값 0)
  pageSize?: number; // 한 페이지에 조회하고 싶은 글 개수 (기본값 30)
}

export default async function getCategoryQNAs(params: GetCategoryQnasProps) {
  const formData = new FormData();

  // 기본 필수 파라미터 설정
  formData.append("subject", "");
  formData.append("pageNumber", (params.pageNumber ?? 0).toString());
  formData.append("pageSize", (params.pageSize ?? 15).toString());

  // 선택적 파라미터 추가
  // null과 undefined를 빈 문자열로 처리하는 기본값을 설정하기 위해 삼항 연산자를 사용
  if (params.qnaPresetTags && params.qnaPresetTags.length > 0) {
    params.qnaPresetTags.forEach(qnaPresetTag => {
      formData.append("questionPresetTags", qnaPresetTag);
    });
  } else formData.append("questionPresetTags", "");
  formData.append("faculty", params.faculty === "전체" ? "" : (params.faculty ?? ""));
  formData.append("chaetaekStatus", params.chaetaekStatus ?? "");
  formData.append("sortType", params.sortType ?? "");

  // API 호출
  try {
    const response = await apiClient.post("/api/question/filter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // API 호출 결과만 반환
    return response.data.questionPostsPage;
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}
