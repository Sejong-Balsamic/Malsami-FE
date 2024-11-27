"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Hamburger from "../../../public/icons/Hamburger.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import getMyInfo from "@/apis/member/getMyInfo";
import { MemberDto } from "@/types/member";

function Nav() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Sheet 열림 상태 관리
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);

  // accessToken 확인 및 사용자 정보 가져오기
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAccessToken(token);

    if (token) {
      getMyInfo()
        .then(data => setMemberInfo(data))
        .catch(error => console.error("Failed to fetch member info:", error));
    }
  }, []);

  const handleLandingPageClick = () => {
    router.push("/");
  };

  const handleLoginPageClick = () => {
    router.push("/login");
  };

  const handleMyPageClick = () => {
    router.push("/mypage");
  };

  const handleQnaPageClick = () => {
    router.push("/board/question");
  };

  const handleDocPageClick = () => {
    router.push("/board/document");
  };

  const handleRulePageClick = () => {
    router.push("/rule");
  };

  const handleNoticePageClick = () => {
    router.push("/notice");
  };

  return (
    <div className="fixed top-0 z-50 h-[64px] w-full max-w-[640px]">
      <div className="absolute left-0 top-0 h-full w-full border-b bg-white" />

      <div
        className="absolute bottom-[12px] left-[18px] cursor-pointer"
        onClick={handleLandingPageClick}
        onKeyDown={e => e.key === "Enter" && handleLandingPageClick()}
        role="button"
        tabIndex={0}
        aria-label="랜딩페이지"
      >
        <div className="h-[30px] w-[30px] border bg-[#ffffff]" />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <div
            className="absolute bottom-[24px] right-[20px] h-[20px] w-[24px] cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Hamburger Menu"
          >
            <Hamburger />
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] p-0">
          <div>
            <ul className="mt-0 space-y-2">
              {!accessToken ? (
                <li
                  className="font-pretendard-bold flex h-[92px] cursor-pointer items-center gap-4 bg-[#03b89e] py-[32px] pl-[30px] text-[20px] text-white"
                  onClick={handleLoginPageClick}
                >
                  <Image src="/icons/My.svg" alt="Search" width={40} height={40} />
                  로그인 후 이용해주세요.
                </li>
              ) : (
                <li
                  className="flex h-[92px] cursor-pointer items-center gap-4 bg-[#03b89e] py-[32px] pl-[30px] text-white"
                  onClick={handleMyPageClick}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-[6px]">
                      <span className="font-pretendard-bold text-[18px]">
                        {memberInfo?.member.studentName || "사용자"}
                      </span>
                      <span className="font-pretendard-semibold text-[14px]">
                        @{memberInfo?.member.uuidNickname || "아이디"}
                      </span>
                    </div>
                    <div>
                      <span className="font-pretendard-medium text-[14px]">
                        {memberInfo?.member.studentId} | {memberInfo?.member.major}
                      </span>
                    </div>
                  </div>
                </li>
              )}
              <li
                className="font-pretendard-bold flex h-[70px] cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={handleQnaPageClick}
              >
                <Image src="/icons/Question_Colored.svg" alt="Search" width={30} height={30} />
                질문 게시판
              </li>
              <li
                className="font-pretendard-bold flex h-[70px] cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={handleDocPageClick}
              >
                <Image src="/icons/Document_Colored.svg" alt="Search" width={30} height={30} />
                자료 게시판
              </li>
              <li
                className="font-pretendard-bold flex h-[70px] cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={handleRulePageClick}
              >
                <Image src="/icons/Rule_Colored.svg" alt="Search" width={30} height={30} />
                이용규칙
              </li>
              <li
                className="font-pretendard-bold flex h-[70px] cursor-pointer items-center gap-2 pl-[30px] text-[20px]"
                onClick={handleNoticePageClick}
              >
                <Image src="/icons/Notice_Colored.svg" alt="Search" width={30} height={30} />
                공지사항
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Nav;
