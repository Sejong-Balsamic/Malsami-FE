"use client";

import React from "react";
import { refreshAccessToken } from "@/apis/auth/refresh";
import FabButton from "@/components/common/FAB";

const handleBtnClick = () => {
  refreshAccessToken()
    .then(token => console.log("Token refreshed:", token))
    .catch(error => console.error("Failed to refresh token:", error));
};

function Page() {
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
      <div className="fixed bottom-5 right-5">
        <FabButton />
      </div>
    </div>
  );
}

export default Page;
