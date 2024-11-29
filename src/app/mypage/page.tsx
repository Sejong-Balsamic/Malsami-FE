"use client";

import { useEffect, useState } from "react";
import { MemberDto } from "@/types/member";
import getMyInfo from "@/apis/member/getMyInfo";
import MyPageNav from "@/components/nav/MyPageNav";
import BasicInfo from "@/components/mypage/BasicInfo";

function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        try {
          setIsLoading(true);
          const data = await getMyInfo();
          setMemberInfo(data);
        } catch (fetchError) {
          console.error("회원 정보 가져오기 실패:", fetchError);
          setError("회원 정보를 불러오는 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("로그인이 필요합니다.");
      }
    };

    fetchMemberInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">회원 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <div>
        <MyPageNav />
      </div>
      <div className="px-[20px]">
        <div>
          <BasicInfo memberInfo={memberInfo} />
        </div>
        <div>카드</div>
        <div>정보섹션</div>
        <div>부가기능</div>
      </div>
    </div>
  );
}

export default Page;
