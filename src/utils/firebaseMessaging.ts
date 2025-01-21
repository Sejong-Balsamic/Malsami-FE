// Messaging 객체 초기화

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/../firebaseConfig";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// FCM 토큰 가져오기 함수
export async function getFcmToken(): Promise<string | null> {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BGMza-Lw4pEyFJ-HxbXbLaHxdfI-xhF6zUdYaIUJ9-q3kxWBDGConYfYaqaNjxUskLWRYKh4VMlJtay1BwVcCZI",
    });
    if (currentToken) {
      console.log("FCM 토큰:", currentToken);
      return currentToken;
    }
    console.warn("사용 가능한 FCM 토큰이 없습니다. 재발급해야함");
    return null;
  } catch (error) {
    console.error("FCM 토큰 검색 오류:", error);
    return null;
  }
}

// Foreground 알림 처리 함수 (사용자의 화면에 활성화된 상태)
export function onMessageListener() {
  onMessage(messaging, payload => {
    console.log("메세지 수신", payload);
    // UI 업데이트나 사용자 알림 표시 추가해야함
  });
}
