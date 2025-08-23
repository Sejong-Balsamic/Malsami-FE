"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5">
      <div className="flex flex-col items-center gap-8">
        {/* 404 이미지 */}
        <div className="relative h-32 w-32">
          <Image src="/image/404.png" alt="Not Found" fill className="object-contain" />
        </div>

        {/* 에러 메시지 */}
        <div className="text-center">
          {/* <h1 className="mb-3 text-5xl font-bold text-gray-800">404</h1> */}
          <h2 className="mb-2 text-SUIT_20 font-semibold text-gray-700">페이지를 찾을 수 없습니다</h2>
          <p className="text-SUIT_14 text-ui-muted">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 rounded-lg bg-ui-disabled px-6 text-SUIT_14 font-semibold text-white"
          >
            이전 페이지
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="h-12 rounded-lg px-6 text-SUIT_14 font-semibold text-white"
            style={{
              background: "linear-gradient(91deg, #00D1F2 0%, #00E271 100%)",
            }}
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
