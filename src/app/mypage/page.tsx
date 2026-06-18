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
import { PageContainer } from "@/components/layout/AppContainer";

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
        <PageContainer width="wide" className="px-5 pb-10">
          {/* PC(lg)에서 좌(프로필+티어카드)/우(정보 리스트) 2단 배치, 모바일은 세로 스택 유지 */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10">
            {/* 좌측: 회원 요약 + 티어/정보 카드 */}
            <div>
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
            </div>

            {/* 우측(PC): 정보 리스트 / 모바일에선 아래로 스택 */}
            <div className="mt-6 lg:mt-0">
              <InfoList memberDto={memberInfo} />
            </div>
          </div>

          {/* 시설 */}
          <div className="mt-6">
            <Facility />
          </div>
        </PageContainer>
      </CommonHeader>
    </div>
  );
}

export default Page;
