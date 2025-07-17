"use client";

import React from "react";
import Image from "next/image";

interface RewardTagProps {
  amount: number;
}

/**
 * 현상금(엽전) 태그 컴포넌트
 * @param amount - 엽전 수 (0 이하일 경우 렌더링하지 않음)
 */
export default function RewardTag({ amount }: RewardTagProps) {
  if (!amount || amount <= 0) return null;

  return (
    <div className="inline-flex items-center justify-center gap-1 rounded bg-[#FFB000] px-1.5 py-1">
      <Image src="/icons/yeopjeon.svg" alt="엽전" width={12} height={12} />
      <span className="line-clamp-1 text-SUIT_12 font-bold text-white">{amount}</span>
    </div>
  );
}
