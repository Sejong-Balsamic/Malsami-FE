"use client";

import React from "react";
import Image from "next/image";

interface SectionHeaderProps {
  title: string; // 섹션 제목
  // eslint-disable-next-line react/require-default-props
  iconSrc?: string; // 제목 왼쪽 아이콘
  // eslint-disable-next-line react/require-default-props
  tabs?: { label: string; value: string }[]; // (선택) 탭 목록
  // eslint-disable-next-line react/require-default-props
  activeTab?: string; // 현재 탭 값
  // eslint-disable-next-line react/require-default-props
  onTabChange?: (value: string) => void; // 탭 클릭 콜백
}

export default function SectionHeader({ title, iconSrc, tabs = [], activeTab, onTabChange }: SectionHeaderProps) {
  return (
    <header className="mb-4 flex items-center justify-between px-[20px]">
      {/* 제목 */}
      <h2 className="flex items-center text-SUIT_20 font-extrabold">
        {iconSrc && <Image src={iconSrc} alt="" width={20} height={20} className="mr-1" />}
        {title}
      </h2>

      {/* 탭 */}
      {tabs.length > 0 && (
        <nav className="flex gap-2">
          {tabs.map(tab => (
            // eslint-disable-next-line react/button-has-type
            <button
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={`rounded-full px-3 py-1 text-SUIT_14 font-semibold ${
                activeTab === tab.value ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              aria-pressed={activeTab === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
