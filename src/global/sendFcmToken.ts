import { authApi } from "@/apis/authApi";

interface FcmResponse {
  fcmToken: string;
}

async function sendFcmTokenToServer(fcmToken: string): Promise<FcmResponse | null> {
  try {
    console.log("전달받은 FCM 토큰:", fcmToken); // 전달된 FCM 토큰 확인

    // 표준 API 호출로 전환
    const response = await authApi.saveFcmToken({ fcmToken });

    console.log("FCM 토큰 서버로 전송 성공:", response);
    return response as unknown as FcmResponse; // 타입 얼라인
  } catch (error) {
    console.error("FCM 토큰 서버 전송 실패:", error);
    return null; // 실패 시 null 반환
  }
}

export default sendFcmTokenToServer;
