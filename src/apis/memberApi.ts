// src/apis/memberApi.ts
import { MemberCommand } from "@/types/api/requests/memberCommand";
import { MemberDto } from "@/types/api/responses/memberDto";
import { postApiRequest } from "./apiUtils";

export const memberApi = {
  // 로그인
  signIn: async (command: Partial<MemberCommand>): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/signin", command),

  // 내 정보 조회
  getMyInfo: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-info", command),

  // 마이페이지 조회
  getMyPage: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-page", command),

  // 접근 정보 조회
  getAccessInfo: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/yeopjeon-info", command),

  // 모든 회원 게시물 조회
  getAllMemberPost: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-post", command),
};

export default memberApi;
