import { apiClient } from "../clients/appClient";

interface GetCommentsParams {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  pageNumber?: number;
  pageSize?: number;
}

const getComments = async ({ postId, contentType, pageNumber = 0, pageSize = 30 }: GetCommentsParams) => {
  try {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("contentType", contentType);
    formData.append("pageNumber", pageNumber.toString());
    formData.append("pageSize", pageSize.toString());

    const response = await apiClient.post("/api/comment/get/all", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("댓글 조회 실패:", error);
    throw new Error("댓글 조회 중 오류가 발생했습니다.");
  }
};

export default getComments;
