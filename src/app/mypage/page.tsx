"use client";

import { useEffect, useState } from "react";
import { MemberDto } from "@/types/member";
import getMyInfo from "@/apis/member/getMyPage";
import MyPageNav from "@/components/nav/MyPageNav";
import TierImage from "@/components/mypage/TierImage";
import BasicInfo from "@/components/mypage/BasicInfo";
import InfoCard from "@/components/mypage/InfoCard";
import InfoList from "@/components/mypage/InfoList";
import Facility from "@/components/mypage/Facility";
import LoadingSpinner from "@/components/common/LoadingSpinner";

function Page() {
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      setIsLoading(true);
      const data = await getMyInfo();
      setMemberInfo(data || {});
      setIsLoading(false);
    };
    fetchMemberInfo();
  }, []);

  if (isLoading) return <LoadingSpinner />;

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
          <TierImage memberInfo={memberInfo} />
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
