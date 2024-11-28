"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

interface AttachedFilesProps {
  files: string[]; // 이미지 경로 배열
}

export default function AttachedFiles({ files }: AttachedFilesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (file: string) => {
    setSelectedImage(file);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[600px]">
      {/* 슬라이더 */}
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        spaceBetween={10}
        slidesPerView={1}
        className="mySwiper h-full"
      >
        {files.map(file => (
          <SwiperSlide key={file} className="flex h-full items-center justify-center rounded-lg bg-gray-100">
            <button
              type="button"
              className="flex h-full w-full items-center justify-center focus:outline-none"
              onClick={() => handleImageClick(file)}
            >
              <Image
                src={file}
                alt="Slide image"
                className="cursor-pointer rounded-lg object-cover"
                layout="fill"
                objectFit="contain"
                priority
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 페이지네이션 */}
      <div className="swiper-pagination font-bold text-black" />

      {/* 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          role="button"
          aria-modal="true"
          tabIndex={0} // 키보드 포커스를 허용
          onClick={closeModal} // 클릭 이벤트
          onKeyDown={e => {
            if (e.key === "Escape") closeModal(); // ESC 키로 모달 닫기
          }}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected"
              className="rounded-lg"
              width={900}
              height={900}
              objectFit="contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
