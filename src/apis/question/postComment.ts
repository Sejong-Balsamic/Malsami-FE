import { apiClient } from "../clients/appClient";

interface PostCommentParams {
  content: string;
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  isPrivate?: boolean;
}

const postComment = async ({ content, postId, contentType, isPrivate = false }: PostCommentParams) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("postId", postId);
    formData.append("contentType", contentType);
    formData.append("isPrivate", isPrivate.toString());

    const response = await apiClient.post("/api/comment/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to post comment:", error);
    throw error;
  }
};

export default postComment;
