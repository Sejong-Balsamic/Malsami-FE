"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { questionPostApi } from "@/apis/questionPostApi";
import SectionHeader from "./SectionHeader";

export default function HotQuestionSection() {
  const [period, setPeriod] = useState<"weekly" | "daily">("weekly");
  const [posts, setPosts] = useState<QuestionPost[]>([]);

  useEffect(() => {
    (async () => {
      const res =
        period === "weekly"
          ? await questionPostApi.getWeeklyPopularQuestionPost()
          : await questionPostApi.getDailyPopularQuestionPost();
      setPosts(res.questionPostsPage?.content ?? []);
    })();
  }, [period]);

  return (
    <section className="mb-10">
      <SectionHeader
        title="HOT 인기질문"
        iconSrc="/icons/badge-hot.svg"
        tabs={[
          { label: "주간", value: "weekly" },
          { label: "일간", value: "daily" },
        ]}
        activeTab={period}
        onTabChange={v => setPeriod(v as "weekly" | "daily")}
      />

      <div className="flex gap-4 overflow-x-auto px-[20px]">
        {posts.map((p, idx) => (
          <Card
            key={p.questionPostId}
            number={idx + 1}
            subject={p.subject ? p.subject : "과목 없음"}
            title={p.title ? p.title : "제목 없음"}
            content={p.content ? p.content : "내용 없음"}
            isCurrentlyPopular
            likeCount={p.likeCount}
            customTags={p.customTags} // FIXME: 현재 아무런 값도 오지 않습니다
            isLiked={!!p.isLiked}
            onClick={() => console.log("질문 상세", p.questionPostId)}
          />
        ))}
      </div>
    </section>
  );
}
