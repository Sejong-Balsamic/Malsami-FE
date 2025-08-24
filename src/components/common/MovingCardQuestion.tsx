"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import Card from "./Card";

interface MovingCardQuestionProps {
  data: QuestionPost[];
}

function MovingCardQuestion({ data = [] }: MovingCardQuestionProps) {
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
      // 동적 import로 Redux 관련 코드 실행 (에러 핸들링 추가)
      Promise.all([import("@/global/store/modalSlice"), import("@/global/store")])
        .then(([{ showModal }, { store }]) => {
          store.dispatch(showModal("로그인 후 이용가능합니다."));
        })
        .catch(err => {
          console.error("로그인 모달 로드 실패:", err);
        });
      return;
    }

    router.push(`/board/question/detail/${postId}`);
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
        {data.map((questionPost, index) => (
          <SwiperSlide key={questionPost.questionPostId || questionPost.title || index} className="!w-72">
            <div
              onClick={() => {
                if (questionPost.questionPostId) {
                  handleCardClick(questionPost.questionPostId);
                }
              }}
              onKeyDown={e =>
                e.key === "Enter" && questionPost.questionPostId && handleCardClick(questionPost.questionPostId)
              }
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <Card
                subject={questionPost.subject as string}
                title={questionPost.title as string}
                content={questionPost.content as string}
                customTags={questionPost.customTags}
                isLiked={questionPost.isLiked || false}
                likeCount={questionPost.likeCount as number}
                answerCount={questionPost.answerCount as number}
                type="question"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovingCardQuestion;
