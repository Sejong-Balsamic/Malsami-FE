"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { showModal } from "@/global/store/modalSlice";
import Card from "./Card";

interface MovingCardDocumentProps {
  data: DocumentPost[];
}

function MovingCardDocument({ data = [] }: MovingCardDocumentProps) {
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

    router.push(`/board/document/detail/${postId}`);
  };

  if (!isMounted) {
    return null;
  }

  if (data.length === 0) return null;

  return (
    <div className="-mx-5 overflow-hidden">
      <Swiper
        key={`swiper-container-${data.length}`}
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
        {data.map((documentPost, index) => {
          return (
            <SwiperSlide key={documentPost.documentPostId || index} className="!w-72">
              <div
                onClick={() => {
                  if (documentPost.documentPostId) {
                    handleCardClick(documentPost.documentPostId);
                  }
                }}
                onKeyDown={e =>
                  e.key === "Enter" && documentPost.documentPostId && handleCardClick(documentPost.documentPostId)
                }
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <Card
                  subject={documentPost.subject as string}
                  title={documentPost.title as string}
                  content={documentPost.content as string}
                  customTags={documentPost.customTags}
                  isLiked={documentPost.isLiked || false}
                  likeCount={documentPost.likeCount as number}
                  type="document" // 자료게시판 타입 지정
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovingCardDocument;
