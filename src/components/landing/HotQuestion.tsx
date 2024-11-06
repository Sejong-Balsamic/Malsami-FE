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

  return (
    <Tabs defaultValue="weekend" className="w-[400px] h-[400px]">
      <div className="flex justify-center">
        <TabsList className="w-[96px] grid grid-cols-2">
          <TabsTrigger value="weekend" className="text-[#aaaaaa] text-[14px] font-pretendard-semibold">
            주간
          </TabsTrigger>
          <TabsTrigger value="today" className="text-[#aaaaaa] text-[14px] font-pretendard-semibold">
            일간
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="weekend">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center text-black text-[18px] font-pretendard-bold">
              🔥HOT 인기질문🔥
            </CardTitle>
            <CardDescription className="flex justify-center text-black text-[16px] font-pretendard-medium">
              세종말싸미에서 이번 주의 인기질문을 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-y-2">
            <MovingCardQuestion data={weekData} />
          </CardContent>
          <CardFooter>
            <Button className="w-[340px] max-w-[376px] h-[30px] bg-[#03b8a3] rounded-[10px] text-white text-[12px] font-pretendard-semibold">
              더보기
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="today">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center text-black text-[18px] font-pretendard-bold">
              🔥HOT 인기질문🔥
            </CardTitle>
            <CardDescription className="flex justify-center text-black text-[16px] font-pretendard-medium">
              세종말싸미에서 오늘의 인기질문을 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MovingCardQuestion data={dayData} />
          </CardContent>
          <CardFooter>
            <Button className="w-[340px] max-w-[376px] h-[30px] bg-[#03b8a3] rounded-[10px] text-white text-[12px] font-pretendard-semibold">
              더보기
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default HotQuestion;
