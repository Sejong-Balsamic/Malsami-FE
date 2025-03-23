import { EmbeddingCommand } from "@/types/api/requests/embeddingCommand";
import { EmbeddingDto } from "@/types/api/responses/embeddingDto";
import { postApiRequest } from "./apiUtils";

export const aiApi = {
  // 유사 임베딩 검색
  searchSimilarEmbeddings: async (command: Partial<EmbeddingCommand>): Promise<EmbeddingDto> =>
    postApiRequest<EmbeddingCommand, EmbeddingDto>("/api/ai/search", command),
};

export default aiApi;
