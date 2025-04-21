"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/common/Card";
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
          <Card
            key={p.questionPostId}
            number={idx + 1}
            subject={p.subject ? p.subject : "과목 없음"}
            title={p.title ? p.title : "제목 없음"}
            content={p.content ? p.content : "내용 없음"}
            likeCount={p.likeCount}
            customTags={p.customTags} // 현재 별도로 주고있지만 QuestionPost 내부에 customTage 포함 요청
            isLiked={!!p.isLiked}
            onClick={() => console.log("전공 질문", p.questionPostId)}
          />
        ))}
      </div>
    </section>
  );
}
