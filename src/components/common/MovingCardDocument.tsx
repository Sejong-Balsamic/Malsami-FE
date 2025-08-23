"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import Card from "./Card";

interface MovingCardDocumentProps {
  data: DocumentPost[];
}

function MovingCardDocument({ data = [] }: MovingCardDocumentProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCardClick = (postId: string) => {
    if (!postId) return;

    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      // 동적 import로 Redux 관련 코드 실행
      import("@/global/store/modalSlice").then(({ showModal }) => {
        import("@/global/store").then(({ store }) => {
          store.dispatch(showModal("로그인 후 이용가능합니다."));
        });
      });
      return;
    }

    router.push(`/board/document/detail/${postId}`);
  };

  if (!isMounted) {
    return null;
  }

  if (data.length === 0) return null;

  return (
    <div className="-mx-5 w-screen overflow-hidden">
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
        className="!pl-5 [&_.swiper-wrapper]:!my-3"
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
