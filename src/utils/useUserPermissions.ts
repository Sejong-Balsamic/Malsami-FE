"use client";

import { useState, useEffect } from "react";
import getMyInfo from "@/apis/member/getMyInfo";

interface UserPermissions {
  canAccessCheonmin: boolean;
  canAccessJungin: boolean;
  canAccessYangban: boolean;
  canAccessKing: boolean;
}

// 사용자 권한에 따라 접근 가능 여부를 결정하는 예시 함수
export default function useUserPermissions() {
  const [permissions, setPermissions] = useState<UserPermissions>({
    canAccessCheonmin: true,
    canAccessJungin: false,
    canAccessYangban: false,
    canAccessKing: false,
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // API 호출
        const userInfo = await getMyInfo();
        const userYeopjeon = userInfo.yeopjeon.yeopjeon;
        // yeopjeon 수에 따라 등급 설정
        let userTier: string;

        if (userYeopjeon <= 1000) {
          userTier = "cheonmin";
        } else if (userYeopjeon <= 10000) {
          userTier = "jungin";
        } else if (userYeopjeon <= 50000) {
          userTier = "yangban";
        } else {
          userTier = "king";
        }

        // 권한을 계급별로 설정
        const updatedPermissions: UserPermissions = {
          canAccessCheonmin: true,
          canAccessJungin: userTier === "jungin" || userTier === "yangban" || userTier === "king",
          canAccessYangban: userTier === "yangban" || userTier === "king",
          canAccessKing: userTier === "king",
        };

        setPermissions(updatedPermissions);
        console.log("permission: ", permissions);
      } catch (error) {
        console.error("Failed to fetch user permissions:", error);
        // 기본값 유지 또는 에러 처리
      }
    };

    fetchPermissions();
  }, []);

  return permissions;
}
