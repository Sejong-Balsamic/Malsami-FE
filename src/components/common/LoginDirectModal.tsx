"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/global/store/modalSlice";
import { RootState } from "@/global/store";
import InfoAlertModal from "./modal/InfoAlertModal";

function LoginDirectModal() {
  const dispatch = useDispatch();
  const { isVisible, content } = useSelector((state: RootState) => state.modal);

  console.log("Modal State:", { isVisible, content });

  const handleConfirm = () => {
    dispatch(closeModal());
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <InfoAlertModal
      isOpen={isVisible}
      title="로그인 필요"
      message="로그인 후 이용가능합니다."
      confirmLabel="로그인"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}

export default LoginDirectModal;
