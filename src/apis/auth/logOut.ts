import { apiClient } from "../clients/appClient";

const logOut = async (): Promise<void> => {
  try {
    await apiClient.post("/api/auth/logout", null, {
      withCredentials: true, // 쿠키 포함
    }); // 성공 처리

    // sessionStorage에서 accessToken 삭제
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("memberId");
    console.log("Successfully logged out");
  } catch (error) {
    // 오류 처리
    console.error("Logout error:", error);
    throw error;
  }
};

export default logOut;
