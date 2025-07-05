"use client";

import React, { useEffect, useState } from "react";
import QuestionCardItem from "@/components/common/QuestionCardItem";
import { ContentType } from "@/types/api/constants/contentType";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { questionPostApi } from "@/apis/questionPostApi";
import SectionHeader from "./SectionHeader";

interface Props {
  majorName: string;
}

export default function MajorQuestionSection({ majorName }: Props) {
  const [posts, setPosts] = useState<QuestionPost[]>([]);

  useEffect(() => {
    (async () => {
      const res = await questionPostApi.getFilteredQuestionPosts({
        faculty: majorName,
        pageNumber: 0,
        pageSize: 5,
        sortType: "LATEST",
      });
      setPosts(res.questionPostsPage?.content ?? []);
    })();
  }, [majorName]);

  return (
    <section className="mb-10">
      <SectionHeader title="내 전공 관련 질문" />
      <div className="flex gap-4 overflow-x-auto px-[20px]">
        {posts.map((p, idx) => (
          <QuestionCardItem
            key={p.questionPostId}
            questionPost={p}
            contentType={ContentType.QUESTION}
            onClick={() => console.log("전공 질문", p.questionPostId)}
          />
        ))}
      </div>
    </section>
  );
}
