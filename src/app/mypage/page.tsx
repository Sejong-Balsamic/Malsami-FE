"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import TierImage from "@/components/mypage/TierImage";
import MemberSummary from "@/components/mypage/MemberSummary";
import InfoCard from "@/components/mypage/InfoCard";
import InfoList from "@/components/mypage/InfoList";
import Facility from "@/components/mypage/Facility";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { MemberDto } from "@/types/api/responses/memberDto";
import memberApi from "@/apis/memberApi";

function Page() {
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      setIsLoading(true);
      const data = await memberApi.getMyPage();
      setMemberInfo(data || {});
      setIsLoading(false);
    };
    fetchMemberInfo();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTopOnLoad />
      <CommonHeader title="마이페이지" rightType={RIGHT_ITEM.NONE}>
        <div className="relative mx-auto w-full max-w-[640px] px-5 pb-10">
          {/* 회원 요약 */}
          <div className="flex justify-end pt-4">
            <MemberSummary memberInfo={memberInfo} />
          </div>

          {/* 티어 및 정보 카드 */}
          <div className="relative mt-6 flex">
            <TierImage memberInfo={memberInfo} />
            <div className="z-10 w-full">
              <InfoCard memberDto={memberInfo} />
            </div>
          </div>

          {/* 정보 리스트 */}
          <div className="mt-6">
            <InfoList memberDto={memberInfo} />
          </div>

          {/* 시설 */}
          <div className="mt-6">
            <Facility />
          </div>
        </div>
      </CommonHeader>
    </div>
  );
}

export default Page;
