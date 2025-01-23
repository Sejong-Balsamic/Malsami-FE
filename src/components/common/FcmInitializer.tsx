// FCM 토큰과 관련된 작업(useEffect)은 별도의 Client Component에서 처리

"use client";

import { useEffect } from "react";
import { getFcmToken } from "@/utils/firebaseMessaging";

export default function FcmInitializer() {
  useEffect(() => {
    async function fetchToken() {
      const token = await getFcmToken();
      if (token) {
        localStorage.setItem("fcmToken", token);
        console.log("FCM 토큰 로컬 스토리지에 저장:", token);
      }
    }
    fetchToken();
  }, []);

  return null; // 렌더링할 내용이 없으므로 null 반환
}
