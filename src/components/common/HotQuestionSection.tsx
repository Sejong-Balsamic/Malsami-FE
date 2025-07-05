"use client";

import React, { useEffect, useState } from "react";
import QuestionCardItem from "@/components/common/QuestionCardItem";
import { ContentType } from "@/types/api/constants/contentType";
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
          <QuestionCardItem
            key={p.questionPostId}
            questionPost={p}
            contentType={ContentType.QUESTION}
            onClick={() => console.log("질문 상세", p.questionPostId)}
          />
        ))}
      </div>
    </section>
  );
}
