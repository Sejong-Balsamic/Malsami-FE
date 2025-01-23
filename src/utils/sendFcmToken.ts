// FCM 토큰 전송 함수

import { apiClient } from "@/apis/clients/appClient"; // apiClient를 import

interface FcmResponse {
  fcmToken: string; // 반환 값에 대한 타입 정의 (백엔드에서 반환하는 형태에 맞게 수정 필요)
}

async function sendFcmTokenToServer(token: string): Promise<FcmResponse | null> {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("token", token); // Firebase에서 발급받은 토큰 [필수]

    // API 호출
    const response = await apiClient.post<FcmResponse>("/api/auth/fcm/token", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    console.log("FCM 토큰 서버로 전송 성공:", response.data);
    return response.data; // 반환된 FCM 정보
  } catch (error) {
    console.error("FCM 토큰 서버 전송 실패:", error);
    return null; // 실패 시 null 반환
  }
}

export default sendFcmTokenToServer;
