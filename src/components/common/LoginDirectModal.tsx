"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/modalSlice";

function LoginDirectModal() {
  const dispatch = useDispatch();
  const { isVisible, content } = useSelector((state: RootState) => state.modal);

  console.log("Modal State:", { isVisible, content });

  if (!isVisible) return null;

  const handleConfirm = () => {
    dispatch(closeModal());
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" />
      <div className="relative z-10 h-48 w-[336px] rounded-2xl bg-cover bg-center">
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-[20px]">
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">로그인 필요</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-[#EEEEEE] pb-[20px] pt-[10px] text-center text-[16px]">
            {content || "해당 페이지는 로그인을 해야 열람할 수 있습니다."}
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              type="button"
              onClick={handleConfirm}
              className="font-pretendard-semibold h-[30px] w-full rounded-lg bg-[#0062d2] text-[14px] text-white"
            >
              로그인 페이지로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginDirectModal;
