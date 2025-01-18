import { apiClient } from "../clients/appClient";

const getFaculties = async () => {
  try {
    const response = await apiClient.post(
      "/api/sejong/faculty/get-all",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("단과대 불러오는 중 오류 발생:", error);
    throw new Error("단과대 불러오는 중 오류 발생했습니다.");
  }
};

export default getFaculties;
