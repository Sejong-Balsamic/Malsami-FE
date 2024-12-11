import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWeeklyHotQuestions, fetchDailyHotQuestions } from "@/apis/landing/fetchHot";
import { QuestionPost } from "@/types/questionPost.types";
import MovingCardQuestion from "./MovingCardQuestion";

function HotQuestion() {
  const [weekData, setWeekData] = useState<QuestionPost[]>([]);
  const [dayData, setDayData] = useState<QuestionPost[]>([]);

  useEffect(() => {
    const getWeeklyData = async () => {
      const data = await fetchWeeklyHotQuestions();
      setWeekData(data);
    };

    const getDailyData = async () => {
      const data = await fetchDailyHotQuestions();
      setDayData(data);
    };

    getWeeklyData();
    getDailyData();
  }, []);

  const checkAccessTokenAndNavigate = (path: string) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
    } else {
      window.location.href = path;
    }
  };

  return (
    <Tabs defaultValue="weekend" className="z-40 h-auto w-full">
      <div className="flex justify-center">
        <TabsList className="grid w-[96px] grid-cols-2">
          <TabsTrigger value="weekend" className="font-pretendard-medium text-[14px] text-[#aaaaaa]">
            주간
          </TabsTrigger>
          <TabsTrigger value="today" className="font-pretendard-medium text-[14px] text-[#aaaaaa]">
            일간
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="weekend">
        <Card>
          <CardHeader>
            <CardTitle className="font-pretendard-bold flex justify-center text-[18px] text-black">
              🔥HOT 인기질문🔥
            </CardTitle>
            <CardDescription className="font-pretendard-medium flex justify-center text-[16px] text-black">
              세종말싸미에서 이번 주의 인기질문을 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-y-2">
            <MovingCardQuestion data={weekData} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => checkAccessTokenAndNavigate("/board/question")}
              className="font-pretendard-semibold h-[30px] w-full rounded-[10px] bg-[#03b8a3] text-[12px] text-white"
            >
              더보기
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="today">
        <Card>
          <CardHeader>
            <CardTitle className="font-pretendard-bold flex justify-center text-[18px] text-black">
              🔥HOT 인기질문🔥
            </CardTitle>
            <CardDescription className="font-pretendard-medium flex justify-center text-[16px] text-black">
              세종말싸미에서 오늘의 인기질문을 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-y-2">
            <MovingCardQuestion data={dayData} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => checkAccessTokenAndNavigate("/board/question")}
              className="font-pretendard-semibold h-[30px] w-full rounded-[10px] bg-[#03b8a3] text-[12px] text-white"
            >
              더보기
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default HotQuestion;
