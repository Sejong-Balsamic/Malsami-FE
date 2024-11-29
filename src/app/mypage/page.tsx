"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MemberDto } from "@/types/member";
import getMyInfo from "@/apis/member/getMyInfo";
import MyPageNav from "@/components/nav/MyPageNav";
import BasicInfo from "@/components/mypage/BasicInfo";
import InfoCard from "@/components/mypage/InfoCard";
import InfoList from "@/components/mypage/InfoList";
import Facility from "@/components/mypage/Facility";
import LoadingSpinner from "@/components/common/LoadingSpinner";

function Page() {
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
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

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <div>
        <MyPageNav title="마이페이지" />
      </div>
      <div className="p-[20px]">
        <div className="flex justify-end">
          <BasicInfo memberInfo={memberInfo} />
        </div>
        <div className="relative flex">
          {/* 티어에 따라 이미지 변동 필요 */}
          <Image
            src="/image/tier/Yangban.svg"
            alt="Yangban"
            width={132}
            height={125}
            className="absolute bottom-[180px] z-0 h-[125px] w-[132px]"
          />
          <div className="z-10 w-full">
            <InfoCard memberInfo={memberInfo} />
          </div>
        </div>
        <div>
          <InfoList memberInfo={memberInfo} />
        </div>
        <div>
          <Facility />
        </div>
      </div>
    </div>
  );
}

export default Page;
