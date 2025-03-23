import { ReportCommand } from "@/types/api/requests/reportCommand";
import { ReportDto } from "@/types/api/responses/reportDto";
import { postApiRequest } from "./apiUtils";

export const reportApi = {
  // 신고 게시글 저장
  saveReportPost: async (command: Partial<ReportCommand>): Promise<ReportDto> =>
    postApiRequest<ReportCommand, ReportDto>("/api/report/post", command),
};

export default reportApi;
