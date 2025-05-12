// components/landing/sections/BountySection.tsx

"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { questionPostApi } from "@/apis/questionPostApi";
import SectionHeader from "./SectionHeader";

export default function BountySection() {
  const [posts, setPosts] = useState<QuestionPost[]>([]);

  useEffect(() => {
    (async () => {
      // TODO: /api/question/bounty` 필요
      const res = await questionPostApi.getDailyPopularQuestionPost();
      setPosts(res.questionPostsPage?.content ?? []);
    })();
  }, []);

  return (
    <section className="mb-10">
      <SectionHeader title="엽전 현상금" iconSrc="/icons/coin.svg" />

      <div className="flex gap-4 overflow-x-auto px-[20px]">
        {posts.map((p, idx) => (
          <Card
            key={p.questionPostId}
            number={idx + 1}
            subject={p.subject ? p.subject : "과목 없음"}
            title={p.title ? p.title : "제목 없음"}
            content={p.content ? p.content : "내용 없음"}
            likeCount={p.likeCount}
            customTags={p.customTags}
            isLiked={!!p.isLiked}
            onClick={() => console.log("현상금 질문", p.questionPostId)}
          />
        ))}
      </div>
    </section>
  );
}
