"use client";

import { useState, useEffect } from "react";
import { MemberDto } from "@/types/api/responses/memberDto";
import memberApi from "@/apis/memberApi";

export default function useUserPermissions() {
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await memberApi.getMyInfo(); // getMyInfo로 가정
        setMemberInfo(data || null);
      } catch (error) {
        console.error("Failed to fetch user permissions:", error);
        setMemberInfo(null);
      }
    };

    fetchPermissions();
  }, []);

  return memberInfo;
}
