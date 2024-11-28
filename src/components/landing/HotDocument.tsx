import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWeeklyHotDocuments, fetchDailyHotDocuments } from "@/apis/landing/fetchHot";
import { DocumentPost } from "@/types/documentPost.types";
import MovingCardDocument from "./MovingCardDocument";

function HotDocument() {
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

  return (
    <Tabs defaultValue="weekend" className="z-40 h-[400px] w-[400px]">
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
            <Link href="/board/document" passHref>
              <Button className="font-pretendard-semibold h-[30px] w-[340px] max-w-[376px] rounded-[10px] bg-[#03b8a3] text-[12px] text-white">
                더보기
              </Button>
            </Link>
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
          <CardContent className="space-y-2">
            <MovingCardDocument data={dayData} />
          </CardContent>
          <CardFooter>
            <Link href="/board/document" passHref>
              <Button className="font-pretendard-semibold h-[30px] w-[340px] max-w-[376px] rounded-[10px] bg-[#03b8a3] text-[12px] text-white">
                더보기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default HotDocument;
