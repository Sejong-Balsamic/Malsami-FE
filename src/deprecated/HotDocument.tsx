import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { fetchWeeklyHotDocuments, fetchDailyHotDocuments } from "@/deprecated/fetchHot";
import { DocumentPost } from "@/types/documentPost.types";
import MovingCardDocument from "@/components/common/MovingCardDocument";

function HotDocument() {
  const router = useRouter();
  const [weekData, setWeekData] = useState<DocumentPost[]>([]);
  const [dayData, setDayData] = useState<DocumentPost[]>([]);

  useEffect(() => {
    const getWeeklyData = async () => {
      const data = await fetchWeeklyHotDocuments();
      setWeekData(data);
    };

    const getDailyData = async () => {
      const data = await fetchDailyHotDocuments();
      setDayData(data);
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
              🔥HOT 인기자료🔥
            </CardTitle>
            <CardDescription className="font-pretendard-medium flex justify-center text-[16px] text-black">
              세종말싸미에서 이번 주의 인기자료를 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-y-2">
            <MovingCardDocument data={weekData} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleNavigation("/board/document/sub/popular-weekly")}
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
              🔥HOT 인기자료🔥
            </CardTitle>
            <CardDescription className="font-pretendard-medium flex justify-center text-[16px] text-black">
              세종말싸미에서 오늘의 인기자료를 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center space-y-2">
            <MovingCardDocument data={dayData} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleNavigation("/board/document/sub/popular-daily")}
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

export default HotDocument;
