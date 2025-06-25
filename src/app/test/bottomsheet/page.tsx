/* eslint-disable */

"use client";

import React, { useState } from "react";
import BottomSheet, { BottomSheetTrigger } from "@/components/common/BottomSheet";
import { useDispatch } from "react-redux";
import { setIsOpen } from "@/global/store/bottomSheetSlice";

export default function BottomSheetTestPage() {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");

  // 초기화 함수
  const handleReset = () => {
    setSelectedOptions([]);
    setTextValue("");
    console.log("초기화됨");
  };

  // 확인 함수
  const handleConfirm = () => {
    console.log("선택된 옵션들:", selectedOptions);
    console.log("텍스트 값:", textValue);
    alert(`선택된 옵션: ${selectedOptions.join(", ")}\n텍스트: ${textValue}`);
  };

  // 옵션 선택/해제 함수
  const toggleOption = (option: string) => {
    setSelectedOptions(prev => (prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]));
  };

  // 커스텀 트리거 버튼 1
  const customTrigger1 = (
    <button
      type="button"
      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => dispatch(setIsOpen(true))}
    >
      커스텀 트리거로 열기
    </button>
  );

  // 커스텀 트리거 버튼 2
  const customTrigger2 = (
    <button
      type="button"
      className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      onClick={() => dispatch(setIsOpen(true))}
    >
      다른 스타일 트리거
    </button>
  );

  // BottomSheet 내부 컨텐츠
  const bottomSheetContent = (
    <div className="space-y-6">
      {/* 옵션 선택 섹션 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">카테고리 선택</h3>
        <div className="space-y-2">
          {["강의자료", "시험자료", "과제자료", "기타자료"].map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 텍스트 입력 섹션 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">메모</h3>
        <textarea
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          placeholder="메모를 입력하세요..."
          className="h-20 w-full rounded border border-gray-300 p-2"
        />
      </div>

      {/* 추가 옵션들 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">정렬 옵션</h3>
        <select className="w-full rounded border border-gray-300 p-2">
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      {/* 스크롤 테스트를 위한 더미 컨텐츠 */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">추가 설정</h3>
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="rounded border p-3">
              <p>설정 항목 {i + 1}</p>
              <p className="text-sm text-gray-600">이것은 스크롤 테스트를 위한 더미 컨텐츠입니다.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-background">
        <h1 className="mb-8 text-3xl font-bold">BottomSheet 테스트 페이지</h1>

        {/* 현재 상태 표시 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">현재 상태</h2>
          <div className="space-y-2">
            <p>
              <strong>선택된 옵션:</strong> {selectedOptions.length > 0 ? selectedOptions.join(", ") : "없음"}
            </p>
            <p>
              <strong>텍스트 값:</strong> {textValue || "없음"}
            </p>
          </div>
        </div>

        {/* 트리거 버튼들 */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold">BottomSheet 트리거들</h2>

          <div className="flex flex-wrap gap-4">
            {/* 기본 제공 트리거 사용 */}
            <BottomSheet onReset={handleReset} onConfirm={handleConfirm} trigger={BottomSheetTrigger}>
              {bottomSheetContent}
            </BottomSheet>

            {/* 커스텀 트리거 1 */}
            <BottomSheet onReset={handleReset} onConfirm={handleConfirm} trigger={customTrigger1}>
              {bottomSheetContent}
            </BottomSheet>

            {/* 커스텀 트리거 2 */}
            <BottomSheet onReset={handleReset} onConfirm={handleConfirm} trigger={customTrigger2}>
              {bottomSheetContent}
            </BottomSheet>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">사용법 안내</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold">1. 기본 제공 트리거 사용</h3>
              <p>BottomSheetTrigger를 import해서 trigger prop으로 전달</p>
              <pre className="mt-2 rounded bg-gray-100 p-2">
                {`import BottomSheet, { BottomSheetTrigger } from "@/components/common/BottomSheet";

<BottomSheet
  onReset={handleReset}
  onConfirm={handleConfirm}
  trigger={BottomSheetTrigger}
>
  {content}
</BottomSheet>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">2. 커스텀 트리거 사용</h3>
              <p>원하는 버튼이나 요소를 만들어서 trigger prop으로 전달</p>
              <pre className="mt-2 rounded bg-gray-100 p-2">
                {`const customTrigger = (
  <button onClick={() => dispatch(setIsOpen(true))}>
    커스텀 버튼
  </button>
);

<BottomSheet
  onReset={handleReset}
  onConfirm={handleConfirm}
  trigger={customTrigger}
>
  {content}
</BottomSheet>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">3. Props 설명</h3>
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  <strong>onReset:</strong> 초기화 버튼 클릭 시 실행될 함수
                </li>
                <li>
                  <strong>onConfirm:</strong> 확인 버튼 클릭 시 실행될 함수
                </li>
                <li>
                  <strong>children:</strong> BottomSheet 내부에 표시될 컨텐츠
                </li>
                <li>
                  <strong>trigger:</strong> BottomSheet를 열 트리거 요소
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}
