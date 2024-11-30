"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MemberDto } from "@/types/member";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import getMyInfo from "@/apis/member/getMyInfo";
import Hamburger from "../../../public/icons/Hamburger.svg";

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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed top-0 z-50 h-[64px] w-full max-w-[640px]">
      <div className="absolute left-0 top-0 h-full w-full border-b bg-white" />

      <button
        type="button"
        className="absolute bottom-[12px] left-[18px] h-[30px] w-[30px] border bg-[#ffffff]"
        onClick={() => handleNavigation("/")}
        aria-label="랜딩페이지"
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="absolute bottom-[24px] right-[20px] h-[20px] w-[24px] cursor-pointer"
            aria-label="Hamburger Menu"
          >
            <Hamburger />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] p-0">
          <div className="w-full">
            <ul className="mt-0 space-y-2">
              {!accessToken ? (
                <button
                  type="button"
                  className="font-pretendard-bold flex h-[92px] w-full cursor-pointer items-center gap-4 bg-[#03b89e] py-[32px] pl-[30px] text-[20px] text-white"
                  onClick={() => handleNavigation("/login")}
                >
                  <Image src="/icons/My.svg" alt="Search" width={40} height={40} />
                  로그인 후 이용해주세요.
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-[92px] w-full cursor-pointer items-center gap-4 bg-[#03b89e] py-[32px] pl-[30px] text-white"
                  onClick={() => handleNavigation("/mypage")}
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
                </button>
              )}
              <button
                type="button"
                className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={() => handleNavigation("/board/question")}
              >
                <Image src="/icons/Question_Colored.svg" alt="Search" width={30} height={30} />
                질문 게시판
              </button>
              <button
                type="button"
                className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={() => handleNavigation("/board/document")}
              >
                <Image src="/icons/Document_Colored.svg" alt="Search" width={30} height={30} />
                자료 게시판
              </button>
              <button
                type="button"
                className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
                onClick={() => handleNavigation("/mypage/rule")}
              >
                <Image src="/icons/Rule_Colored.svg" alt="Search" width={30} height={30} />
                이용규칙
              </button>
              <button
                type="button"
                className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 pl-[30px] text-[20px]"
                onClick={() => handleNavigation("/mypage/notice")}
              >
                <Image src="/icons/Notice_Colored.svg" alt="Search" width={30} height={30} />
                공지사항
              </button>
              <button
                type="button"
                className="absolute bottom-0 font-pretendard-medium flex h-[70px] w-full cursor-pointer items-center gap-2 pl-[30px] text-[16px]"
                onClick={() => handleNavigation("/logout")}
              >
                로그아웃
              </button>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Nav;
