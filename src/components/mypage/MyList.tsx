"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuestionPost } from "@/types/question";
import MyCard from "./MyCard";

interface MyListProps {
  data: QuestionPost[];
}

function MyList({ data }: MyListProps) {
  const itemsPerPage = 10; // 한 번에 로드할 항목 수
  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage)); // 초기 데이터
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null); // 관찰 대상
  const router = useRouter();

  const loadMoreData = useCallback(() => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;

    if (startIndex < data.length) {
      setVisibleData(prev => [...prev, ...data.slice(startIndex, endIndex)]);
      setPage(nextPage);
    }
  }, [data, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreData]);

  return (
    <div className="flex flex-col gap-4">
      {visibleData.map(item => (
        <div
          key={item.questionPostId}
          role="button"
          tabIndex={0} // 키보드 탐색 가능
          onClick={() => router.push(`/board/detail/${item.questionPostId}`)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              router.push(`/board/detail/${item.questionPostId}`);
            }
          }} // 키보드 이벤트 추가
          className="cursor-pointer"
        >
          <MyCard
            title={item.title}
            content={item.content}
            thumbnail={item.thumbnailUrl}
            rewardYeopjeon={item.rewardYeopjeon}
            categories={item.questionPresetTags}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            viewCount={item.viewCount}
            createdDate={item.createdDate}
          />
        </div>
      ))}

      <div ref={loaderRef} className="h-10 bg-transparent" />
    </div>
  );
}

export default MyList;
