import getComments from "@/apis/question/getComments";

interface RefreshCommentsParams {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setTotalComments?: React.Dispatch<React.SetStateAction<number>>;
  pageNumber?: number;
  pageSize?: number;
}

export default async function refreshComments({
  postId,
  contentType,
  setComments,
  setTotalComments,
  pageNumber = 0,
  pageSize = 30,
}: RefreshCommentsParams): Promise<void> {
  try {
    // 댓글 API 호출
    const response = await getComments({ postId, contentType, pageNumber, pageSize });

    // 상태 업데이트
    setComments(response.commentsPage.content);

    if (setTotalComments) {
      setTotalComments(response.commentsPage.totalElements);
    }
  } catch (error) {
    console.error("댓글 새로고침 중 오류 발생:", error);
  }
}
