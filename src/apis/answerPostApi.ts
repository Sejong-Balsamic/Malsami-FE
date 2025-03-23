import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { postApiRequest } from "./apiUtils";

export const answerPostApi = {
  // 답변글 저장
  saveAnswerPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/answer/post", command),

  // 질문에 대한 답변글 조회
  getAnswersByQuestion: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/answer/get/all", command),

  // 채택된 답변글 처리
  chaetaekAnswerPost: async (command: Partial<QuestionCommand>): Promise<QuestionDto> =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/answer/chaetaek", command),
};

export default answerPostApi;
