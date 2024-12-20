import MyPageNav from "@/components/nav/MyPageDetailNav";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyList from "@/components/mypage/MyList";

function Page() {
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
              <CardDescription>질문 개수: 30개</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-5 py-8">
              <MyList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="answer">
          <Card>
            <CardHeader>
              <CardDescription>답변 개수: 5개</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-5 py-8">
              <MyList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
