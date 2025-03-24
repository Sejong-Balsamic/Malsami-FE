import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";
import { postApiRequest } from "./apiUtils";

export const noticePostApi = {
  // 필터링된 공지사항 게시글 조회
  getFilteredNoticePosts: async (command: Partial<NoticePostCommand>): Promise<NoticePostDto> =>
    postApiRequest<NoticePostCommand, NoticePostDto>("/api/notice/filter", command),
};

export default noticePostApi;
