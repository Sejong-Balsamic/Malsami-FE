import { SejongAcademicDto } from "@/types/api/responses/sejongAcademicDto";
import { SejongAcademicCommand } from "@/types/api/requests/SejongAcademicCommand";
import { postApiRequest } from "./apiUtils";

export const sejongAcademicApi = {
  // 모든 학부 조회
  getAllFaculties: async (command: Partial<SejongAcademicCommand>): Promise<SejongAcademicDto> =>
    postApiRequest<SejongAcademicCommand, SejongAcademicDto>("/api/sejong/faculty/get-all", command),

  // 모든 과목 조회
  getAllSubjects: async (): Promise<SejongAcademicDto> =>
    postApiRequest<SejongAcademicCommand, SejongAcademicDto>("/api/sejong/subject/get-all", {}),
};

export default sejongAcademicApi;
