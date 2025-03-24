import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { questionPostApi } from "@/apis/questionPostApi"; // questionPostApi 임포트
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import MovingCardQuestion from "./MovingCardQuestion";

function HotQuestion() {
  const router = useRouter();
  const [weekData, setWeekData] = useState<QuestionPost[]>([]);
  const [dayData, setDayData] = useState<QuestionPost[]>([]);

  useEffect(() => {
    const getWeeklyData = async () => {
      try {
        const data = await questionPostApi.getWeeklyPopularQuestionPost();
        const weeklyQuestions = data.questionPostsPage?.content as QuestionPost[];
        setWeekData(weeklyQuestions);
      } catch (error) {
        console.error("주간 인기 질문 가져오기 실패:", error);
        setWeekData([]);
      }
    };

    const getDailyData = async () => {
      try {
        const data = await questionPostApi.getDailyPopularQuestionPost();
        const dailyQuestions = data.questionPostsPage?.content || []; // QuestionPost[] 추출
        setDayData(dailyQuestions);
      } catch (error) {
        console.error("일간 인기 질문 가져오기 실패:", error);
        setDayData([]);
      }
    };

    getWeeklyData();
    getDailyData();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
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
              onClick={() => handleNavigation("/board/question")}
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
              onClick={() => handleNavigation("/board/question")}
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
