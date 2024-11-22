import { apiClient } from "../clients/appClient";

interface GetCommentsParams {
  postId: string;
  contentType: string;
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
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};

export default getComments;
