import { QueryCommand } from "@/types/api/requests/queryCommand";
import { QueryDto } from "@/types/api/responses/queryDto";
import { postApiRequest } from "./apiUtils";

export const queryApi = {
  // 검색어로 게시물 조회
  getPostsByQuery: async (command: Partial<QueryCommand>): Promise<QueryDto> =>
    postApiRequest<QueryCommand, QueryDto>("/api/query", command),

  // 실시간 인기 검색어 조회
  getTopKeywords: async (command: Partial<QueryCommand>): Promise<QueryDto> =>
    postApiRequest<QueryCommand, QueryDto>("/api/query/popular", command),
};

export default queryApi;
