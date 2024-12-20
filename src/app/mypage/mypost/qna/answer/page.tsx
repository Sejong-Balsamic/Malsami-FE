"use client";

import React, { useState, useEffect } from "react";

import MyPageNav from "@/components/nav/MyPageDetailNav";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyList from "@/components/mypage/MyList";
import getMyList from "@/apis/member/getMyList";

function Page() {
  const [questionList, setQuestionList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 질문 리스트 가져오기
        const questionData = await getMyList({
          listType: "question",
        });
        setQuestionList(questionData.items);

        // 답변 리스트 가져오기
        const answerData = await getMyList({
          listType: "answer",
        });
        setAnswerList(answerData.items);
      } catch (err) {
        setError("리스트를 가져오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <MyPageNav title="내가 작성한 질문 / 답변" />
      <Tabs defaultValue="question" className="w-full">
        <TabsList className="grid h-[50px] w-full grid-cols-2 rounded-none">
          <TabsTrigger
            value="question"
            className="data-[state=active]:font-pretendard-semibold h-full rounded-none border-b-2 text-[18px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-[#03B89E] data-[state=active]:bg-white data-[state=active]:text-black"
          >
            질문
          </TabsTrigger>
          <TabsTrigger
            value="answer"
            className="data-[state=active]:font-pretendard-semibold h-full rounded-none border-b-2 text-[18px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-[#03B89E] data-[state=active]:bg-white data-[state=active]:text-black"
          >
            답변
          </TabsTrigger>
        </TabsList>
        <TabsContent value="question">
          <Card>
            <CardHeader>
              <CardDescription>질문 개수: {questionList.length}개</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-5 py-8">
              <MyList data={questionList} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="answer">
          <Card>
            <CardHeader>
              <CardDescription>답변 개수: {answerList.length}개</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-5 py-8">
              <MyList data={answerList} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
