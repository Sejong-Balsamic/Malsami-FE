"use client";

import { useState } from "react";
import { refreshAccessToken } from "@/apis/auth/refresh";
// import AttendanceSnackBar from "@/components/attendance/AttendanceSnackBar";
import { Toaster } from "@/components/ui/toaster";
import BottomSheetModal from "@/components/common/BottomSheetModal";

const handleBtnClick = () => {
  refreshAccessToken()
    .then(token => console.log("Token refreshed:", token))
    .catch(error => console.error("Failed to refresh token:", error));
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchModal = () => setIsModalOpen(prev => !prev); // 모달 열기/닫기 토글
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

      <div>
        <button type="button" onClick={switchModal}>
          Open Modal
        </button>
        <BottomSheetModal isVisible={isModalOpen} onClose={switchModal}>
          <h1>Hello, World!asdfsadfsafasfasdfaasdfsafsfsafasfas</h1>
        </BottomSheetModal>
      </div>
    </div>
  );
}
