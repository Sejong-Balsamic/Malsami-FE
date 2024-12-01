"use client";

import { useState, useEffect } from "react";
import getAccessInfo from "@/apis/member/getAccessInfo";

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
        const userInfo = await getAccessInfo();

        // 권한을 계급별로 설정
        const updatedPermissions: UserPermissions = {
          canAccessCheonmin: userInfo.canAccessCheonmin,
          canAccessJungin: userInfo.canAccessJungin,
          canAccessYangban: userInfo.canAccessYangban,
          canAccessKing: userInfo.canAccessKing,
        };

        setPermissions(updatedPermissions);
      } catch (error) {
        console.error("Failed to fetch user permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  return permissions;
}
