"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import documentPostApi from "@/apis/documentPostApi";
import SectionHeader from "./SectionHeader";

export default function HotDocumentSection() {
  const [period, setPeriod] = useState<"weekly" | "daily">("weekly");
  const [docs, setDocs] = useState<DocumentPost[]>([]);

  useEffect(() => {
    (async () => {
      const res =
        period === "weekly"
          ? await documentPostApi.getWeeklyPopularDocumentPost()
          : await documentPostApi.getDailyPopularDocumentPost();
      setDocs(res.documentPostsPage?.content ?? []);
    })();
  }, [period]);

  return (
    <section className="mb-10">
      <SectionHeader
        title="HOT 인기자료"
        iconSrc="/icons/badge-hot-doc.svg"
        tabs={[
          { label: "주간", value: "weekly" },
          { label: "일간", value: "daily" },
        ]}
        activeTab={period}
        onTabChange={v => setPeriod(v as "weekly" | "daily")}
      />

      <div className="flex gap-4 overflow-x-auto px-[20px]">
        {docs.map((d, idx) => (
          <Card
            key={d.documentPostId}
            number={idx + 1}
            subject={d.subject ? d.subject : "과목 없음"}
            title={d.title ? d.title : "제목 없음"}
            content={d.content ? d.content : "내용 없음"}
            likeCount={d.likeCount}
            // customTags={d.customTags ? d.customTags : []} // 해당부분 DocumnetDto.customTags로 가져와야함
            isLiked={!!d.isLiked}
            onClick={() => console.log("문서 상세", d.documentPostId)}
          />
        ))}
      </div>
    </section>
  );
}
