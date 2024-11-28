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
    <div className="w-full max-w-[430px] h-[300px] mx-auto relative">
      {/* 슬라이더 */}
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        spaceBetween={10}
        slidesPerView={1}
        className="mySwiper h-full"
      >
        {files.map((file, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-gray-100 rounded-lg h-full"
          >
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={file}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(file)} // 이미지 클릭 핸들러
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 페이지네이션 */}
      <div className="swiper-pagination text-black font-bold"></div>

      {/* 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative">
            {/* 모달 내부 이미지 */}
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-[24px] font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachedFiles;
