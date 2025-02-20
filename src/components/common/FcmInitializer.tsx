"use client";

import { useEffect } from "react";
import { getFcmToken } from "@/utils/firebaseMessaging";
import sendFcmTokenToServer from "@/utils/sendFcmToken"; // 서버로 FCM 토큰 전송 함수

export default function FcmInitializer() {
  useEffect(() => {
    async function fetchAndSendToken() {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("로그인하지 않은 상태입니다. FCM 토큰 검색과 전송을 생략합니다.");
        return;
      }

      // 알림 권한 확인
      const { permission } = Notification;
      if (permission !== "granted") {
        console.warn("알림 권한이 없습니다. FCM 토큰 검색을 생략합니다.");
        return;
      }

      // FCM 토큰 검색 및 전송
      try {
        const existingToken = localStorage.getItem("fcmToken");
        const isFcmTokenSentToServer = localStorage.getItem("fcmTokenSentToServer");

        // 기존 토큰이 이미 저장되고 서버로 전송된 경우, 작업 생략
        if (existingToken && isFcmTokenSentToServer === "true") {
          console.log("FCM 토큰이 이미 서버로 전송되었습니다. 작업을 생략합니다.");
          return;
        }

        // 새로운 FCM 토큰 발급 (또는 기존 토큰 사용)
        const newToken = existingToken || (await getFcmToken());
        if (newToken) {
          localStorage.setItem("fcmToken", newToken);
          console.log("FCM 토큰 로컬 스토리지에 저장:", newToken);

          // 서버로 전송
          await sendFcmTokenToServer(newToken);
          console.log("FCM 토큰 서버로 전송 완료");

          // 전송 여부 저장
          localStorage.setItem("fcmTokenSentToServer", "true");
        } else {
          console.warn("FCM 토큰을 발급받지 못했습니다.");
        }
      } catch (error) {
        console.error("FCM 토큰 처리 중 오류 발생:", error);
      }
    }

    fetchAndSendToken();
  }, []);

  return null;
}
