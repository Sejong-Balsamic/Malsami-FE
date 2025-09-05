"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { showModal } from "@/global/store/modalSlice";
import NoticeCard from "./NoticeCard";

interface MovingCardNoticeProps {
  data: NoticePost[];
}

function MovingCardNotice({ data = [] }: MovingCardNoticeProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCardClick = (postId: string) => {
    if (!postId) return;

    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    router.push(`/notice/${postId}`);
  };

  if (!isMounted) {
    return null;
  }

  if (data.length === 0) return null;

  return (
    <div className="-mx-5 overflow-hidden">
      <Swiper
        key={`swiper-notice-${data.length}`}
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={12}
        loop={data.length >= 2}
        autoplay={
          data.length >= 2
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        className="!pl-5 !pr-5 [&_.swiper-wrapper]:!my-3"
      >
        {data.map((notice, index) => {
          return (
            <SwiperSlide key={notice.noticePostId || index} className="!w-72">
              <NoticeCard
                notice={notice}
                onClick={() => {
                  if (notice.noticePostId) {
                    handleCardClick(notice.noticePostId);
                  }
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovingCardNotice;
