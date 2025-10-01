import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";
import { postApiRequest } from "./apiUtils";

export const noticePostApi = {
  // 필터링된 공지사항 게시글 조회
  fetchFilteredNoticePosts: async (command: Partial<NoticePostCommand>): Promise<NoticePostDto> =>
    postApiRequest<NoticePostCommand, NoticePostDto>("/api/notice/filter", command),

  // 단일 공지사항 상세 조회
  fetchNoticePost: async (command: Partial<NoticePostCommand>): Promise<NoticePostDto> =>
    postApiRequest<NoticePostCommand, NoticePostDto>("/api/notice/get", command),

  // PIN된 공지사항 조회
  fetchPinnedNoticePosts: async (): Promise<NoticePostDto> =>
    postApiRequest<NoticePostCommand, NoticePostDto>("/api/notice/get/pinned", {}),
};

export default noticePostApi;
