"use client";

import React from "react";
import { refreshAccessToken } from "@/apis/auth/refresh";
// import AttendanceSnackBar from "@/components/attendance/AttendanceSnackBar";
import { Toaster } from "@/components/ui/toaster";

const handleBtnClick = () => {
  refreshAccessToken()
    .then(token => console.log("Token refreshed:", token))
    .catch(error => console.error("Failed to refresh token:", error));
};

export default function Home() {
  return (
    <div>
      <div className="font-pretendard-bold">
        sejong-malsami
        <br />
        home page
      </div>
      <button type="button" className="bg-gray-400 rounded-lg" onClick={handleBtnClick}>
        refreshAccessTokenButton
      </button>
      {/* <AttendanceSnackBar /> */}
      <Toaster />
    </div>
  );
}
