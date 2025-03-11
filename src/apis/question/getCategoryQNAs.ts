import { ChaetaekStatusKey } from "@/types/chaetaekStatus";
import { QnaPresetTagsKey } from "@/types/qnaPresetTags";
import { QnaSortType } from "@/types/api/constants/sortTypes";
import { apiClient } from "../appClient";

interface GetCategoryQnasProps {
  subject?: string; // 교과목명 필터링
  minYeopjeon?: number; // 엽전 현상금 최소 개수
  maxYeopjeon?: number; // 엽전 현상금 최대 개수
  qnaPresetTags?: QnaPresetTagsKey[]; // 정적 태그 필터링
  chaetaekStatus?: ChaetaekStatusKey; // 채택여부 필터링
  sortType?: QnaSortType; // 정렬 조건
  faculty?: string; // 단과대 필터링 (REDUX: selectedFacultyMapByBoard["question"]의 value)
  isAllFacultySelected?: boolean; // 단고대가 "전체"로 선택된 여부
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
  // 단과대 필터 분기문
  if (params.isAllFacultySelected) {
    // "전체"를 선택한 경우
    formData.append("faculty", "");
  } else {
    // "전체"를 선택하지 않은 경우
    // eslint-disable-next-line no-lonely-if
    if (params.faculty) {
      // 단과대를 선택한 경우
      formData.append("faculty", params.faculty);
    } else {
      // 단과대를 선택하지 않은 경우 ("전체" 로 판단)
      formData.append("faculty", "");
    }
  }
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
