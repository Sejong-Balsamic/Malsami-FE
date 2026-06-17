// src/components/mypage/InfoList.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MemberDto } from "@/types/api/responses/memberDto";
import AnimatedNumber from "./AnimatedNumber";

function InfoList({ memberDto }: { memberDto: MemberDto | null }) {
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* 활동 요약 */}
      <div className="relative grid w-full grid-cols-3 rounded-xl border border-question-main py-6">
        <button
          onClick={() => router.push("/mypage/mycomment")}
          type="button"
          className="flex flex-col items-center justify-center gap-3"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">내 댓글</span>
          <div className="flex items-center gap-1.5">
            <Image src="/icons/mypage/Comment.svg" alt="Comment" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalCommentCount || 0} /> : "0"}
            </span>
          </div>
        </button>
        <button
          onClick={() => router.push("/mypage/mypost")}
          type="button"
          className="flex flex-col items-center justify-center gap-3"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">내 게시글</span>
          <div className="flex items-center gap-1.5">
            <Image src="/icons/mypage/Post.svg" alt="Post" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalPostCount || 0} /> : "0"}
            </span>
          </div>
        </button>
        <div className="absolute bottom-6 left-1/3 top-6 w-0.5 bg-legacy-teal-sub" />
        <div className="absolute bottom-6 left-2/3 top-6 w-0.5 bg-legacy-teal-sub" />
        <button
          onClick={() => router.push("/mypage/myrecommend")}
          type="button"
          className="flex flex-col items-center justify-center gap-3"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">즐겨찾기</span>
          <div className="flex items-center gap-1.5">
            <Image src="/icons/mypage/Star.svg" alt="Star" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalPopularPostCount || 0} /> : "0"}
            </span>
          </div>
        </button>
      </div>

      {/* 내 자료 관련 폴더 */}
      <div className="relative grid w-full grid-cols-1 gap-6 rounded-xl border border-question-main p-5">
        <button
          onClick={() => router.push("/mypage/mypost/doc")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icons/book/Book_Blue.svg" alt="Folder" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">내가 올린 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="w-1.75 h-3.5" />
        </button>
        <button
          onClick={() => router.push("/mypage/mypost/qna")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icons/book/Book_Green.svg" alt="Folder" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">내가 올린 질문</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="w-1.75 h-3.5" />
        </button>
      </div>

      {/* 엽전 사용 내역 */}
      <div className="relative grid w-full grid-cols-1 grid-rows-2 gap-5 rounded-xl border border-question-main p-5">
        <button
          onClick={() => router.push("/mypage/mypurchase")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icons/book/Book_Yellow.svg" alt="Folder" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">구매한 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="w-1.75 h-3.5" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">도움이 된 답변</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="w-1.75 h-3.5" />
        </button>
      </div>

      {/* 이용 규칙 */}
      <div className="flex w-full items-center justify-between rounded-xl border border-question-main p-5">
        <button
          onClick={() => router.push("/notice")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Image src="/icons/Notice_Colored.svg" alt="notice" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">공지사항</span>
          </div>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="w-1.75 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default InfoList;
