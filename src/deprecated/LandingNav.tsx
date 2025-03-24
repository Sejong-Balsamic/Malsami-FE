// "use client";
//
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import Image from "next/image";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
//
// import Header from "@/components/common/Header";
// import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
// import { MemberDto } from "@/types/member";
// import getMyInfo from "@/apis/member/getMyInfo";
// import useLogout from "@/hooks/useLogout";
// import { showToast } from "@/utils/toastUtils";
//
// function Nav() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [memberInfo, setMemberInfo] = useState<MemberDto | null>(null);
//
//   const [clickCount, setClickCount] = useState(0); // 로고 클릭 횟수
//   const [isEasterEggActive, setIsEasterEggActive] = useState(false);
//
//   const handleLogout = useLogout();
//
//   // 로고 클릭 시: 홈으로 이동 + 클릭 횟수 증가
//   const onLeftClick = () => {
//     router.push("/");
//     setClickCount(prev => prev + 1);
//   };
//
//   // 햄버거 메뉴 클릭 시: Sheet 열기
//   const onRightClick = () => {
//     setIsSheetOpen(true);
//   };
//
//   // 5회 이상 클릭 → 이스터에그 활성
//   useEffect(() => {
//     if (clickCount >= 5) {
//       setIsEasterEggActive(true);
//       setClickCount(0);
//       setTimeout(() => setIsEasterEggActive(false), 5000); // 5초 뒤 자동 숨김
//     }
//   }, [clickCount]);
//
//   // accessToken 확인 + 사용자 정보 가져오기
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     setAccessToken(token);
//
//     if (token) {
//       getMyInfo()
//         .then(data => setMemberInfo(data))
//         .catch(error => {
//           const message = error.response?.data?.message || "사용자 정보를 가져오지 못했습니다.";
//           showToast(dispatch, message, "orange");
//         });
//     }
//   }, [dispatch]);
//
//   const handleNavigation = (path: string) => {
//     router.push(path);
//     setIsSheetOpen(false); // 메뉴 클릭 시 시트 닫기
//   };
//
//   return (
//     <>
//       {/* 상단 헤더 */}
//       <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
//         <Header
//           leftType={LEFT_ITEM.LOGO}
//           rightType={RIGHT_ITEM.MENU}
//           onLeftClick={onLeftClick}
//           onRightClick={onRightClick}
//           title=""
//           // hasNotification={true}  // 만약 오른쪽이 BELL이라면 여기로 빨간 점 여부 넣으면 됨
//         />
//         {isEasterEggActive && (
//           <div className="pointer-events-none absolute inset-0 z-50">
//             <div
//               className="absolute left-[60px] top-[15px] animate-moveToHamburger"
//               style={{
//                 width: "40px",
//                 height: "40px",
//               }}
//             >
//               <Image src="/image/cockroach.svg" alt="cockroach" width={60} height={50} />
//             </div>
//           </div>
//         )}
//       </div>
//
//       {/* 햄버거 메뉴 (Sheet) */}
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         {/* SheetTrigger는 Header 안에서 대신 제어했으므로 여기선 생략 가능 */}
//         <SheetContent side="right" className="w-[300px] p-0">
//           <div className="w-full">
//             <ul className="mt-0 space-y-2">
//               {/* 로그인 X */}
//               {!accessToken ? (
//                 <button
//                   type="button"
//                   className="font-pretendard-bold flex h-[92px] w-full cursor-pointer items-center gap-4 bg-[#03b89e] py-[32px] pl-[30px] text-[20px] text-white"
//                   onClick={() => handleNavigation("/login")}
//                 >
//                   <span>로그인 후 이용해주세요</span>
//                   <div className="flex">
//                     <Image src="/icons/Move.svg" alt="Mypage" width={10} height={10} />
//                   </div>
//                 </button>
//               ) : (
//                 // 로그인 O
//                 <button
//                   type="button"
//                   className="py-auto flex h-[92px] w-full cursor-pointer items-center gap-4 bg-[#03b89e] px-[30px] text-white"
//                   onClick={() => handleNavigation("/mypage")}
//                 >
//                   <div className="flex w-full items-center justify-between">
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-[6px]">
//                         <span className="font-pretendard-bold text-[18px]">
//                           {memberInfo?.member.studentName || "사용자"}
//                         </span>
//                         <span className="font-pretendard-semibold text-[14px]">
//                           @{memberInfo?.member.uuidNickname || "아이디"}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="font-pretendard-medium text-[14px]">
//                           {memberInfo?.member.studentId} | {memberInfo?.member.major}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex">
//                       <Image src="/icons/Move.svg" alt="Mypage" width={10} height={10} />
//                     </div>
//                   </div>
//                 </button>
//               )}
//
//               {/* 메뉴 아이템들 */}
//               <button
//                 type="button"
//                 className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
//                 onClick={() => handleNavigation("/board/question")}
//               >
//                 <Image src="/icons/Question_Colored.svg" alt="Question" width={30} height={30} />
//                 질문 게시판
//               </button>
//
//               <button
//                 type="button"
//                 className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
//                 onClick={() => handleNavigation("/board/document")}
//               >
//                 <Image src="/icons/Document_Colored.svg" alt="Document" width={30} height={30} />
//                 자료 게시판
//               </button>
//
//               <button
//                 type="button"
//                 className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
//                 onClick={() => handleNavigation("/help")}
//               >
//                 <Image src="/icons/Rule_Colored.svg" alt="Help" width={30} height={30} />
//                 이용도우미
//               </button>
//
//               <button
//                 type="button"
//                 className="font-pretendard-bold flex h-[70px] w-full cursor-pointer items-center gap-2 border-b-2 pl-[30px] text-[20px]"
//                 onClick={() => handleNavigation("/notice")}
//               >
//                 <Image src="/icons/Notice_Colored.svg" alt="Notice" width={30} height={30} />
//                 공지사항
//               </button>
//
//               {accessToken && (
//                 <button
//                   type="button"
//                   className="font-pretendard-medium absolute bottom-0 flex h-[70px] w-full cursor-pointer items-center gap-2 pl-[30px] text-[16px]"
//                   onClick={handleLogout}
//                 >
//                   로그아웃
//                 </button>
//               )}
//             </ul>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
//
// export default Nav;
