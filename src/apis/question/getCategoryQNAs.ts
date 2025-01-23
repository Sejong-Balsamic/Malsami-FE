import { apiClient } from "../clients/appClient";

interface GetCategoryQnasProps {
  subject?: string; // 교과목명 필터링
  minYeopjeon?: number; // 엽전 현상금 최소 개수
  maxYeopjeon?: number; // 엽전 현상금 최대 개수
  questionPresetTags?: string[]; // 정적 태그 필터링
  faculty?: string; // 단과대 필터링 (REDUX: selectedFacultyMapByBoard["question"]의 value)
  isAllFacultySelected?: boolean; // 단고대가 "전체"로 선택된 여부
  isChaetaek?: string; // 채택여부 필터링
  sortOption?: string; // 정렬 조건
  pageNumber?: number; // 조회하고 싶은 페이지 번호 (기본값 0)
  pageSize?: number; // 한 페이지에 조회하고 싶은 글 개수 (기본값 30)
}

export default async function getCategoryQNAs(params: GetCategoryQnasProps) {
  // 한국어 -> 영어 매핑 객체
  const sortOptionMapping: { [key: string]: string } = {
    최근순: "LATEST",
    "좋아요 많은 순": "MOST_LIKED",
    "엽전현상금 많은 순": "REWARD_YEOPJEON",
    "조회수 많은 순": "VIEW_COUNT",
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
  const chaetaekMapping: { [key: string]: string } = {
    전체: "ALL",
    채택됨: "CHAETAEK",
    미채택: "NO_CHAETAEK",
  };

  const formData = new FormData();

  // 정렬 옵션 영문 변환 함수
  const getEnglishSortOption = (koreanSortOption: string): string | undefined => {
    return sortOptionMapping[koreanSortOption];
  };

  // 기본 파라미터
  formData.append("subject", params.subject || "");
  formData.append("pageNumber", (params.pageNumber ?? 0).toString());
  formData.append("pageSize", (params.pageSize ?? 15).toString());

  // 태그 필터
  if (params.questionPresetTags && params.questionPresetTags.length > 0) {
    params.questionPresetTags.forEach(tag => {
      const englishTag = tagMapping[tag];
      if (englishTag) {
        formData.append("questionPresetTags", englishTag);
      }
    });
  } else {
    formData.append("questionPresetTags", "");
  }

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

  // 채택 여부
  if (params.isChaetaek && chaetaekMapping[params.isChaetaek]) {
    formData.append("chaetaekStatus", chaetaekMapping[params.isChaetaek]);
  }

  // 정렬 옵션
  if (params.sortOption) {
    const englishSortOption = getEnglishSortOption(params.sortOption);
    if (englishSortOption) {
      formData.append("sortType", englishSortOption);
    }
  }

  try {
    const response = await apiClient.post("/api/question/filter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.questionPostsPage; // API 호출 결과만 반환
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}
