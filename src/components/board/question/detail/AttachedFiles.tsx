"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface AttachedFilesProps {
  files: string[]; // 이미지 경로 배열
}

const AttachedFiles: React.FC<AttachedFilesProps> = ({ files }) => {
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
        {files.map((file, index) => (
          <SwiperSlide key={index} className="flex h-full items-center justify-center rounded-lg bg-gray-100">
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={file}
                alt={`Slide ${index + 1}`}
                className="h-full w-full cursor-pointer rounded-lg object-cover"
                onClick={() => handleImageClick(file)} // 이미지 클릭 핸들러
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 페이지네이션 */}
      <div className="swiper-pagination font-bold text-black"></div>

      {/* 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={closeModal}>
          <div className="relative">
            {/* 모달 내부 이미지 */}
            <img src={selectedImage} alt="Selected" className="max-h-[90vh] max-w-[90vw] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachedFiles;
