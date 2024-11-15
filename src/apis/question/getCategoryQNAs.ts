import { apiClient } from "../clients/appClient";

interface GetCategoryQnasProps {
  subject?: string; // 교과목명 필터링
  minYeopjeon?: number; // 엽전 현상금 최소 개수
  maxYeopjeon?: number; // 엽전 현상금 최대 개수
  questionPresetTags?: string[]; // 정적 태그 필터링
  faculty?: string; // 단과대별 필터링
  isChaetaek?: string; // 채택여부 필터링
  sortOption?: string; // 정렬 조건
  pageNumber?: number; // 조회하고 싶은 페이지 번호 (기본값 0)
  pageSize?: number; // 한 페이지에 조회하고 싶은 글 개수 (기본값 30)
}

export default async function getCategoryQNAs(params: GetCategoryQnasProps) {
  // 한국어 -> 영어 매핑 객체
  const sortOptionMapping: { [key: string]: string } = {
    최신순: "LATEST",
    좋아요: "MOST_LIKED",
    "엽전 현상금 순": "YEOPJEON_REWARD",
    조회수: "VIEW_COUNT",
  };
  const tagMapping: { [key: string]: string } = {
    "수업 외 내용": "OUT_OF_CLASS",
    "개념 모름": "UNKNOWN_CONCEPT",
    "더 나은 풀이": "BETTER_SOLUTION",
    "시험 대비": "EXAM_PREPARATION",
    "자료 요청": "DOCUMENT_REQUEST",
    "공부 팁": "STUDY_TIPS",
    "조언 구함": "ADVICE_REQUEST",
  };

  const formData = new FormData();

  // 영어 변환 함수
  const getEnglishSortOption = (koreanSortOption: string): string | undefined => {
    return sortOptionMapping[koreanSortOption];
  };

  formData.append("subject", "");
  formData.append("pageNumber", (params.pageNumber ?? 0).toString());
  formData.append("pageSize", (params.pageSize ?? 30).toString());
  // 선택적 파라미터 추가
  // if (params.maxYeopjeon !== undefined) formData.append("maxYeopjeon", params.maxYeopjeon.toString());
  if (params.maxYeopjeon) formData.append("maxYeopjeon", params.maxYeopjeon.toString());
  if (params.questionPresetTags && params.questionPresetTags.length > 0) {
    params.questionPresetTags.forEach(tag => {
      const englishTag = tagMapping[tag]; // 한국어 태그를 영어로 변환
      if (englishTag) formData.append("questionPresetTags", englishTag);
    });
  } else formData.append("questionPresetTags", "");
  if (params.faculty) formData.append("faculty", params.faculty === "전체" ? "" : params.faculty); // faculty값 추가
  if (params.isChaetaek) formData.append("viewNotChaetaek", params.isChaetaek);
  if (params.sortOption) {
    const englishSortOption = getEnglishSortOption(params.sortOption);
    if (englishSortOption) formData.append("sortType", englishSortOption);
  }

  try {
    const response = await apiClient.post("/api/question/get/filtered-posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.questionPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
