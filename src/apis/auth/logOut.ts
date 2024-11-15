import { apiClient } from "../clients/appClient";

export const logOut = async (): Promise<void> => {
  try {
    await apiClient.post("/api/auth/logout", null, {});
    // 성공 처리
    console.log("Successfully logged out");
  } catch (error) {
    // 오류 처리
    console.error("Logout error:", error);
    throw error;
  }
};

export default logOut;
