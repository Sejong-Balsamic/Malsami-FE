"use client";
import React from "react";
import { refreshAccessToken } from "@/apis/auth/refresh";

const handleBtnClick = () => {
  refreshAccessToken()
    .then(token => console.log("Token refreshed:", token))
    .catch(error => console.error("Failed to refresh token:", error));
};

export default function Home() {
  return (
    <div>
      <div className="font-pretendard-bold">
        sejong-malsami <br></br>home page
      </div>
      <button className="bg-gray-400 rounded-lg" onClick={handleBtnClick}>
        refreshAccessTokenButton
      </button>
    </div>
  );
}
