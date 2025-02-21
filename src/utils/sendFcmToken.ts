import { apiClient } from "@/apis/clients/appClient";

interface FcmResponse {
  fcmToken: string;
}

async function sendFcmTokenToServer(fcmToken: string): Promise<FcmResponse | null> {
  try {
    console.log("전달받은 FCM 토큰:", fcmToken); // 전달된 FCM 토큰 확인

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("fcmToken", fcmToken); // Firebase에서 발급받은 토큰

    // API 호출
    const response = await apiClient.post<FcmResponse>("/api/auth/fcm/token", formData);

    console.log("FCM 토큰 서버로 전송 성공:", response.data);
    return response.data; // 반환된 FCM 정보
  } catch (error) {
    console.error("FCM 토큰 서버 전송 실패:", error);
    return null; // 실패 시 null 반환
  }
}

export default sendFcmTokenToServer;
