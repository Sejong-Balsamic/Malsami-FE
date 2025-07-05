"use client";

import React, { useEffect, useState } from "react";
import documentPostApi from "@/apis/documentPostApi";
import DocumentCardItem from "@/components/common/DocumentCardItem";
import { ContentType } from "@/types/api/constants/contentType";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import SectionHeader from "./SectionHeader";

interface Props {
  majorName: string;
}

export default function MajorDocumentSection({ majorName }: Props) {
  const [docs, setDocs] = useState<DocumentPost[]>([]);

  useEffect(() => {
    (async () => {
      const res = await documentPostApi.filteredDocumentPost({
        faculty: majorName,
        pageNumber: 0,
        pageSize: 5,
        sortType: "LATEST",
      });
      setDocs(res.documentPostsPage?.content ?? []);
    })();
  }, [majorName]);

  return (
    <section className="mb-10">
      <SectionHeader title="내 전공 관련 자료" />
      <div className="flex gap-4 overflow-x-auto px-[20px]">
        {docs.map((d, idx) => (
          <DocumentCardItem
            key={d.documentPostId}
            documentPost={d}
            contentType={ContentType.DOCUMENT}
            onClick={() => console.log("전공 자료", d.documentPostId)}
          />
        ))}
      </div>
    </section>
  );
}
