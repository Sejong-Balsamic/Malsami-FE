"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/global/store";
import { closeModal } from "@/global/store/modalSlice";
import InfoAlertModal from "./modal/InfoAlertModal";

export default function GlobalLoginModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isVisible, content } = useSelector((state: RootState) => state.modal);

  const handleConfirm = () => {
    dispatch(closeModal());
    router.push("/login");
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <InfoAlertModal
      isOpen={isVisible}
      title="로그인 필요"
      message={content || "로그인 후 이용가능합니다."}
      confirmLabel="로그인"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
