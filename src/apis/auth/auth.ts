import axios from "axios";
import { getFcmToken } from "@/utils/firebaseMessaging"; // FCM 토큰 발급 함수
import { apiClient } from "../clients/appClient"; // FCM 토큰 전송에 사용하는 apiClient

export const login = async (id: string, password: string) => {
  if (!id || !password) {
    throw new Error("아이디와 비밀번호는 필수 입력 사항입니다.");
  }

  // form-data 객체 생성
  const formData = new FormData();
  formData.append("sejongPortalId", id);
  formData.append("sejongPortalPassword", password);

  try {
    // 로그인 API 호출
    const response = await axios.post("https://api.sejong-malsami.co.kr/api/member/signin", formData, {
      withCredentials: true, // http-only로 Cookie에 refreshToken 저장
    });

    // 성공 처리
    sessionStorage.setItem("accessToken", response.data.accessToken);

    // FCM 토큰 발급 및 전송
    const fcmToken = await getFcmToken();
    if (fcmToken) {
      // FCM 토큰 서버로 전송
      await apiClient.post("/api/auth/fcm/token", { token: fcmToken });
      console.log("FCM 토큰 전송 성공");
    } else {
      console.warn("FCM 토큰을 발급받을 수 없습니다.");
    }

    return response.data; // 사용자 정보 반환
  } catch (error) {
    // 오류 처리
    console.error("로그인 실패:", error);
    console.warn("로그아웃 되었습니다. 다시 로그인해주세요");
    throw error;
  }
};

export default login;
