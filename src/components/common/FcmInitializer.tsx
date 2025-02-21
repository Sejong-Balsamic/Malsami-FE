"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFcmToken } from "@/utils/firebaseMessaging"; // FCM 토큰 발급 함수
import sendFcmTokenToServer from "@/utils/sendFcmToken"; // FCM 토큰 서버 전송 함수
import { RootState, AppDispatch } from "@/store"; // Redux Store 타입
import { setFcmToken, setIsFcmTokenSentToServer } from "@/store/fcmSlice"; // Redux 액션

export default function FcmInitializer() {
  // Redux의 dispatch를 사용하여 상태 변경
  const dispatch = useDispatch<AppDispatch>();

  // Redux Store에서 fcmToken과 전송 여부 상태를 가져옴
  const { fcmToken, isFcmTokenSentToServer } = useSelector((state: RootState) => state.fcm);

  useEffect(() => {
    async function fetchAndSendToken() {
      // 0. SSR 환경 방지: 브라우저에서만 실행
      if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
        console.warn("⚠️ 브라우저 환경에서만 FCM을 사용할 수 있습니다.");
        return;
      }

      // 1. 로그인 상태 확인 (세션 스토리지에서 accessToken 확인)
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("로그인하지 않은 상태입니다. FCM 토큰 검색과 전송을 생략합니다.");
        return;
      }

      // 2. 알림 권한 확인
      const { permission } = Notification;
      if (permission !== "granted") {
        console.warn("알림 권한이 없습니다. FCM 토큰 검색을 생략합니다.");
        return;
      }

      // 3. 기존 토큰이 존재하고 서버에 이미 전송된 경우, 작업 생략
      if (fcmToken && isFcmTokenSentToServer) {
        console.log("FCM 토큰이 이미 서버로 전송되었습니다. 작업을 생략합니다.");
        return;
      }

      try {
        // 4. FCM 토큰 발급 (기존 토큰이 없으면 새로 발급)
        const newToken = fcmToken || (await getFcmToken());

        if (newToken) {
          // Redux에 FCM 토큰 저장
          dispatch(setFcmToken(newToken));
          console.log("FCM 토큰 Redux Store에 저장:", newToken);

          // 5. FCM 토큰 서버로 전송
          await sendFcmTokenToServer(newToken);
          console.log("FCM 토큰 서버로 전송 완료");

          // Redux에 전송 완료 상태 저장
          dispatch(setIsFcmTokenSentToServer(true));
        } else {
          console.warn("FCM 토큰을 발급받지 못했습니다.");
        }
      } catch (error) {
        // 6. 에러 발생 시 로깅
        console.error("FCM 토큰 처리 중 오류 발생:", error);
      }
    }

    // 클라이언트 환경에서만 FCM 초기화
    if (typeof window !== "undefined") {
      fetchAndSendToken();
    }
  }, [dispatch, fcmToken, isFcmTokenSentToServer]); // 의존성 배열에 Redux 상태 추가

  return null;
}
