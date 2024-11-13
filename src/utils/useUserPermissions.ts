"use client";

import { useState, useEffect } from "react";

// 사용자 권한에 따라 접근 가능 여부를 결정하는 예시 함수
export default function useUserPermissions() {
  const [permissions, setPermissions] = useState({
    canAccessCheonmin: true,
    canAccessJungin: false,
    canAccessYangban: false,
    canAccessKing: false,
  });

  useEffect(() => {
    // 실제 API 호출을 통해 권한 정보를 가져오는 코드로 대체해야 함
    // 예시 데이터를 사용
    const userPermissions = {
      canAccessCheonmin: true,
      canAccessJungin: true,
      canAccessYangban: false,
      canAccessKing: false,
    };

    setPermissions(userPermissions);
  }, []);

  return permissions;
}
