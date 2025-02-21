// Messaging 객체 초기화

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/../firebaseConfig";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 브라우저 환경에서만 messaging 객체 생성
let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

// FCM 토큰 가져오기 함수
export async function getFcmToken(): Promise<string | null> {
  if (!messaging) {
    console.warn("FCM은 브라우저 환경에서만 사용할 수 있습니다.");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // 환경 변수로 VAPID 키 불러오기
      serviceWorkerRegistration: registration, // 서비스 워커 등록 객체 전달
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
  if (!messaging) return;

  onMessage(messaging, payload => {
    console.log("💡 메세지 수신:", payload);
  });
}
