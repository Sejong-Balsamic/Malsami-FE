// src/global/useUserPermissions.ts

"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/global/store";
import { setAccessInfo } from "@/global/store/authSlice";
import memberApi from "@/apis/memberApi";

const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30분 캐시 만료 시간

export default function useUserPermissions() {
  const dispatch = useDispatch();
  const { accessInfo, lastAccessFetchTime, isLoggedIn } = useSelector((state: RootState) => state.auth);

  // 캐시 유효성 판별
  const isCacheValid = useCallback(() => {
    if (!accessInfo || !lastAccessFetchTime) return false;
    const now = Date.now();
    return now - lastAccessFetchTime < CACHE_EXPIRY_TIME;
  }, [accessInfo, lastAccessFetchTime]);

  // 권한 정보 가져오기 API 호출 및 캐시
  const fetchPermissions = useCallback(async () => {
    try {
      // 1. 이미 유효한 캐시가 있으면 호출을 건너뜀 (중복 조회 전면 제거)
      if (isCacheValid()) {
        return;
      }

      // 2. 비로그인 상태면 조회 건너뜀
      const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
      if (!isLoggedIn && !token) {
        return;
      }

      const data = await memberApi.getAccessInfo(); // 엽전 정보 API 호출
      dispatch(setAccessInfo(data || null));
    } catch (error) {
      console.error("Failed to fetch user permissions:", error);
    }
  }, [dispatch, isLoggedIn, isCacheValid]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  return accessInfo;
}
