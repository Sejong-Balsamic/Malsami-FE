import { apiClient } from "../appClient";

const logOut = async (): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("fcmToken", "//TODO: 추가해야합니다");

    await apiClient.post("/api/auth/logout", formData, {
      withCredentials: true, // 쿠키 포함
    });

    // sessionStorage에서 accessToken 삭제
    sessionStorage.removeItem("accessToken");
    console.log("Successfully logged out");
  } catch (error) {
    // 오류 처리
    console.error("Logout error:", error);
    throw error;
  }
};

export default logOut;
