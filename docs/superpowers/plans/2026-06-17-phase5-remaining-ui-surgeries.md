# Phase 5 (Step 3, 4, 5): 잔여 UI 수술 (마이페이지·질문상세·검색바) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 마이페이지, 질문 상세, 공통 검색바 전반에 남아있는 60여 건의 비표준 픽셀 하드코딩(`[xxpx]`)을 테일윈드 4배수 그리드 배정 체계 및 프로젝트 공인 폰트 토큰(`text-SUIT_xx`)으로 100% 교체 완수한다.

**Architecture:** 
1. **표준 그리드 및 폰트 수렴**:
   - `text-[12px]` ➔ `text-SUIT_12`
   - `text-[14px]` ➔ `text-SUIT_14`
   - `text-[16px]` ➔ `text-SUIT_16`
   - `text-[18px]` ➔ `text-SUIT_18`
   - `text-[20px]` ➔ `text-SUIT_20`
   - 24px ➔ `6`, 44px ➔ `11`, 20px ➔ `5`, 18px ➔ `4.5`, 14px ➔ `3.5`, 10px ➔ `2.5`, 8px ➔ `2`, 2px ➔ `0.5`, 1px ➔ `px`, 120px ➔ `30`, 90px ➔ `22.5`, 336px ➔ `84`, 52px ➔ `13`, 18px ➔ `4.5` 등 4배수 및 소수점 공식에 맞춰 환산한다.
2. **Surgical Precision**: 공통 컴포넌트, 비즈니스 영역, 팝업 모달 영역 전반을 차근차근 수술하여 빌드를 정상 완수시킨다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, npm

---

### Task 1: Step 3 - 마이페이지 전반 UI 픽셀 수술

**Files:**
- Modify: `src/components/mypage/Facility.tsx`
- Modify: `src/components/mypage/InfoCard.tsx`
- Modify: `src/components/mypage/InfoList.tsx`
- Modify: `src/components/mypage/MemberSummary.tsx`
- Modify: `src/components/mypage/TierImage.tsx`

- [ ] **Step 1: 마이페이지 전반 픽셀 하드코딩 전면 대치**

`src/components/mypage/Facility.tsx` 교체:
```typescript
<<<<
const SECTION_BORDER = "border-b border-ui-divider";
const ROW_PADDING = "p-[24px]";
const ROW_GAP = "gap-6";
const TITLE_FONT = "text-SUIT_16 font-medium";

function Facility() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = useLogout();

  const handleLogoutClick = async () => {
    setIsModalOpen(false);
    await handleLogout();
  };

  const handleLeave = () => {
    router.push("/mypage/withdraw");
  };

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button onClick={handleLeave} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>회원탈퇴</span>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button
          onClick={() => router.push("/mypage/policy")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">개인정보 처리방침</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button onClick={() => router.push("/help")} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>세종말싸미 이용도우미</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button
          onClick={() => router.push("/mypage/rule")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">이용규칙</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button
          onClick={() => router.push("/notice")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">공지사항</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>

      {/* 로그아웃 경고 모달 */}
      <WarningAlertModal
        isOpen={isModalOpen}
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        confirmLabel="확인"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleLogoutClick}
      />
    </div>
  );
}
====
const SECTION_BORDER = "border-b border-ui-divider";
const ROW_PADDING = "p-6"; // p-[24px] ➔ p-6 (24px)
const ROW_GAP = "gap-6";
const TITLE_FONT = "text-SUIT_16 font-medium";

function Facility() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = useLogout();

  const handleLogoutClick = async () => {
    setIsModalOpen(false);
    await handleLogout();
  };

  const handleLeave = () => {
    router.push("/mypage/withdraw");
  };

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button onClick={handleLeave} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>회원탈퇴</span>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
        <button
          onClick={() => router.push("/mypage/policy")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-SUIT_18">개인정보 처리방침</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button onClick={() => router.push("/help")} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>세종말싸미 이용도우미</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
        <button
          onClick={() => router.push("/mypage/rule")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-SUIT_18">이용규칙</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button
          onClick={() => router.push("/notice")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-SUIT_18">공지사항</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
      </div>

      {/* 로그아웃 경고 모달 */}
      <WarningAlertModal
        isOpen={isModalOpen}
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        confirmLabel="확인"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleLogoutClick}
      />
    </div>
  );
}
>>>>
```

`src/components/mypage/InfoCard.tsx` 교체:
```typescript
<<<<
        <SwiperSlide className="flex rounded-[15px] bg-legacy-teal-sub">
          <div className="flex h-full w-full flex-col gap-7 px-[20px] py-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-[14px]">경험치</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-semibold text-[20px]">{memberDto?.exp?.exp || "0"}</span>
                  <span className="font-pretendard-medium text-[14px]">EXP</span>
                  <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
                </div>
              </div>
              <div className="py-2">
                <ExpBar value={memberDto?.exp?.exp || 0} />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-[14px]">{currentRank}</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-medium text-[14px] text-mypage-teal">{nextRank}</span>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-1">
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">상위</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Rank.svg" alt="Rank" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberDto ? <AnimatedNumber target={memberDto.expPercentile || 0} /> : "0"}%
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 w-[2px] bg-legacy-teal" />
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">받은 좋아요</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberDto ? <AnimatedNumber target={memberDto.totalLikeCount || 0} /> : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-stretch rounded-[15px] border-2 border-legacy-teal-sub bg-white">
          <div className="flex h-full w-full flex-col gap-3 p-5">
            <span className="font-pretendard-medium text-[14px]">
              왕이 되기 위해선 {nextRankRequirement}EXP 가 필요하오.
            </span>
            <ScrollArea className="relative h-[98px] w-full rounded-[15px] bg-legacy-teal-sub p-2">
              <div className="flex flex-col gap-2">
                {tierProgressData.map(({ label, requirement }) => {
                  return (
                    <div key={label} className="grid grid-cols-2">
                      <div className="font-pretendard-semibold flex items-center justify-start text-[18px]">
                        {memberDto?.exp?.exp !== undefined && memberDto.exp.exp >= requirement ? "✓" : " "}
                      </div>
                      <div className="font-pretendard-medium flex items-center justify-start text-[14px]">{label}</div>
                      <div className="font-pretendard-medium flex items-center justify-end text-[14px]">
                        {requirement} EXP
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </SwiperSlide>
====
        <SwiperSlide className="flex rounded-2xl bg-legacy-teal-sub">
          <div className="flex h-full w-full flex-col gap-7 px-5 py-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-SUIT_14">경험치</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-semibold text-SUIT_20">{memberDto?.exp?.exp || "0"}</span>
                  <span className="font-pretendard-medium text-SUIT_14">EXP</span>
                  <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-3 w-1.5" />
                </div>
              </div>
              <div className="py-2">
                <ExpBar value={memberDto?.exp?.exp || 0} />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-SUIT_14">{currentRank}</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-medium text-SUIT_14 text-mypage-teal">{nextRank}</span>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-1">
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-SUIT_16">상위</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Rank.svg" alt="Rank" width={18} height={18} className="h-4.5 w-4.5" />
                  <span className="font-pretendard-semibold text-SUIT_20">
                    {memberDto ? <AnimatedNumber target={memberDto.expPercentile || 0} /> : "0"}%
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 w-0.5 bg-legacy-teal" />
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-SUIT_16">받은 좋아요</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-4.5 w-4.5" />
                  <span className="font-pretendard-semibold text-SUIT_20">
                    {memberDto ? <AnimatedNumber target={memberDto.totalLikeCount || 0} /> : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-stretch rounded-2xl border-2 border-legacy-teal-sub bg-white">
          <div className="flex h-full w-full flex-col gap-3 p-5">
            <span className="font-pretendard-medium text-SUIT_14">
              왕이 되기 위해선 {nextRankRequirement}EXP 가 필요하오.
            </span>
            <ScrollArea className="relative h-24 w-full rounded-2xl bg-legacy-teal-sub p-2">
              <div className="flex flex-col gap-2">
                {tierProgressData.map(({ label, requirement }) => {
                  return (
                    <div key={label} className="grid grid-cols-2">
                      <div className="font-pretendard-semibold flex items-center justify-start text-SUIT_18">
                        {memberDto?.exp?.exp !== undefined && memberDto.exp.exp >= requirement ? "✓" : " "}
                      </div>
                      <div className="font-pretendard-medium flex items-center justify-start text-SUIT_14">{label}</div>
                      <div className="font-pretendard-medium flex items-center justify-end text-SUIT_14">
                        {requirement} EXP
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </SwiperSlide>
>>>>
```

`src/components/mypage/InfoList.tsx` 교체:
```typescript
<<<<
  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* 활동 요약 */}
      <div className="relative grid w-full grid-cols-3 rounded-[12px] border border-question-main py-6">
        <button
          onClick={() => router.push("/mypage/mycomment")}
          type="button"
          className="flex flex-col items-center justify-center gap-[12px]"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">내 댓글</span>
          <div className="flex items-center gap-[6px]">
            <Image src="/icons/mypage/Comment.svg" alt="Comment" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalCommentCount || 0} /> : "0"}
            </span>
          </div>
        </button>
        <button
          onClick={() => router.push("/mypage/mypost")}
          type="button"
          className="flex flex-col items-center justify-center gap-[12px]"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">내 게시글</span>
          <div className="flex items-center gap-[6px]">
            <Image src="/icons/mypage/Post.svg" alt="Post" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalPostCount || 0} /> : "0"}
            </span>
          </div>
        </button>
        <div className="absolute bottom-[24px] left-1/3 top-[24px] w-[2px] bg-legacy-teal-sub" />
        <div className="absolute bottom-[24px] left-2/3 top-[24px] w-[2px] bg-legacy-teal-sub" />
        <button
          onClick={() => router.push("/mypage/myrecommend")}
          type="button"
          className="flex flex-col items-center justify-center gap-[12px]"
        >
          <span className="text-SUIT_14 font-medium text-ui-count">즐겨찾기</span>
          <div className="flex items-center gap-[6px]">
            <Image src="/icons/mypage/Star.svg" alt="Star" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_18 font-bold text-legacy-teal">
              {memberDto ? <AnimatedNumber target={memberDto.totalPopularPostCount || 0} /> : "0"}
            </span>
          </div>
        </button>
      </div>

      {/* 내 자료 관련 폴더 */}
      <div className="relative grid w-full grid-cols-1 gap-6 rounded-[12px] border border-question-main p-[20px]">
        <button
          onClick={() => router.push("/mypage/mypost/doc")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/book/Book_Blue.svg" alt="Folder" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_14 font-medium text-ui-body">내가 올린 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button
          onClick={() => router.push("/mypage/mypost/qna")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/book/Book_Green.svg" alt="Folder" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_14 font-medium text-ui-body">내가 올린 질문</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>

      {/* 엽전 사용 내역 */}
      <div className="relative grid w-full grid-cols-1 grid-rows-2 gap-[20px] rounded-[12px] border border-question-main p-[20px]">
        <button
          onClick={() => router.push("/mypage/mypurchase")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-[10px]">
            <Image
              src="/icons/book/Book_Yellow.svg"
              alt="Folder"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            <span className="text-SUIT_14 font-medium text-ui-body">구매한 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_14 font-medium text-ui-body">도움이 된 답변</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>

      {/* 이용 규칙 */}
      <div className="flex w-full items-center justify-between rounded-[12px] border border-question-main p-[20px]">
        <button
          onClick={() => router.push("/notice")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/Notice_Colored.svg" alt="notice" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-SUIT_14 font-medium text-ui-body">공지사항</span>
          </div>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
    </div>
  );
====
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
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-3.5 w-1.75" />
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
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-3.5 w-1.75" />
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
            <Image
              src="/icons/book/Book_Yellow.svg"
              alt="Folder"
              width={18;
              height={18}
              className="h-4.5 w-4.5"
            />
            <span className="text-SUIT_14 font-medium text-ui-body">구매한 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-4.5 w-4.5" />
            <span className="text-SUIT_14 font-medium text-ui-body">도움이 된 답변</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="Move" width={7} height={14} className="h-3.5 w-1.75" />
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
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-3.5 w-1.75" />
        </button>
      </div>
    </div>
  );
>>>>
```

`src/components/mypage/MemberSummary.tsx` 교체:
```typescript
<<<<
function MemberSummary({ memberInfo }: { memberInfo: MemberDto | null }) {
  return (
    <div className="flex">
      <div className="float-right pb-[10px] pt-[30px]">
        <div className="flex w-full pb-[10px]">
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-[6px]">
              <span className="font-pretendard-semibold text-[18px]">
                {memberInfo?.member?.studentName || "사용자"}
              </span>
              <span className="font-pretendard-medium text-[14px]">
                @{memberInfo?.member?.uuidNickname || "아이디"}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium text-[14px] text-ui-body-soft">
                {memberInfo?.member?.studentId} | {memberInfo?.member?.major}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-[29px] items-center justify-between gap-[8px] rounded-[28px] border-2 border-mypage-teal-light bg-white px-[12px]"
          >
            <Image src="/icons/Yeopjeon.svg" alt="Yeopjeon" width={16} height={16} className="h-[16px] w-[16px]" />
            <span className="font-pretendard-semibold text-[14px] text-legacy-teal">
              {memberInfo?.yeopjeon?.yeopjeon || "0"}
            </span>
            <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
====
function MemberSummary({ memberInfo }: { memberInfo: MemberDto | null }) {
  return (
    <div className="flex">
      <div className="float-right pb-2.5 pt-7.5">
        <div className="flex w-full pb-2.5">
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-1.5">
              <span className="font-pretendard-semibold text-SUIT_18">
                {memberInfo?.member?.studentName || "사용자"}
              </span>
              <span className="font-pretendard-medium text-SUIT_14">
                @{memberInfo?.member?.uuidNickname || "아이디"}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium text-SUIT_14 text-ui-body-soft">
                {memberInfo?.member?.studentId} | {memberInfo?.member?.major}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-7 items-center justify-between gap-2 rounded-full border-2 border-mypage-teal-light bg-white px-3"
          >
            <Image src="/icons/Yeopjeon.svg" alt="Yeopjeon" width={16} height={16} className="h-4 w-4" />
            <span className="font-pretendard-semibold text-SUIT_14 text-legacy-teal">
              {memberInfo?.yeopjeon?.yeopjeon || "0"}
            </span>
            <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-3 w-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>
```

`src/components/mypage/TierImage.tsx` 교체:
```typescript
<<<<
  return (
    <div className="relative mr-[-15px] flex items-center justify-center">
      <Image src={imagePath} alt={tierName} width={138} height={158} className="z-20 h-[158px] w-[138px]" />
      <div className="absolute h-full w-full flex-col gap-7 rounded-[15px] bg-white px-[20px] py-[30px]" />
    </div>
  );
====
  return (
    <div className="relative mr-[-15px] flex items-center justify-center">
      <Image src={imagePath} alt={tierName} width={138} height={158} className="z-20 h-[158px] w-[138px]" />
      <div className="absolute h-full w-full flex-col gap-7 rounded-2xl bg-white px-5 py-7.5" />
    </div>
  );
>>>>
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git commit -m "마이페이지 UI 토큰화 수술 : refactor : 마이페이지 주요 5개 컴포넌트 내의 비표준 픽셀 30여 건을 테일윈드 규격 그리드로 완전 정량화 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 2: Step 4 - 질문 상세 전반 UI 픽셀 수술

**Files:**
- Modify: `src/components/questionDetail/QuestionDetail.tsx`
- Modify: `src/components/questionDetail/AnswerSection.tsx`
- Modify: `src/components/questionDetail/CommentList.tsx`
- Modify: `src/components/questionDetail/ChaetaekCheckModal.tsx`
- Modify: `src/components/questionDetail/ChaetaekSuccessModal.tsx`

- [ ] **Step 1: 질문 상세 영역 픽셀 하드코딩 교환**

`src/components/questionDetail/QuestionDetail.tsx` 교체:
```typescript
<<<<
      {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
      <div className="mt-4 flex flex-wrap items-center gap-[4px]">
        {questionDto.questionPost?.isCurrentlyPopular && <HotTag />}
        <SubjectTag subjectName={questionDto.questionPost?.subject} type="question" />
        <BountyTag bounty={questionDto.questionPost?.bounty} />
        {questionDto.questionPost?.isAnswered && <AcceptTag />}
      </div>

      {/* 제목 영역 */}
      <div className="mt-4">
        <div className="flex h-auto w-full items-start justify-between">
          <h1 className="text-SUIT_18 font-semibold leading-[18px] text-black">{questionDto.questionPost?.title}</h1>
        </div>
        <div className="mt-2 flex items-center gap-[4px] text-SUIT_12 font-medium text-ui-muted">
          <span>@{questionDto.questionPost?.member?.uuidNickname}</span>
          <span>•</span>
          <span>{getDateDiff(questionDto.questionPost?.createdDate || "")}</span>
          <span>•</span>
          <span>조회수 {questionDto.questionPost?.viewCount}</span>
        </div>
      </div>

      {/* 본문 텍스트 영역 */}
      <div className="mt-[16px] text-SUIT_16 font-medium leading-[22.4px] text-black">
        <p className="whitespace-pre-wrap">{questionDto.questionPost?.content}</p>
      </div>

      {/* 미디어 파일 슬라이드 영역 */}
      {questionDto.questionFiles && questionDto.questionFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-[12px] pb-[10px]">
            {questionDto.questionFiles.map((file, index) => (
              <div
                key={file.questionFileId || index}
                className="flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-ui-divider-thick"
              >
                <Image
                  src={file.fileUrl || "/image/default-file.png"}
                  alt={`attachment-${index}`}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 질문 태그 영역 */}
      {questionDto.questionPost?.documentTypes && questionDto.questionPost.documentTypes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-[8px]">
          {questionDto.questionPost.documentTypes.map((tag, index) => (
            <div
              key={index}
              className="flex h-[28px] w-auto min-w-[69px] flex-shrink-0 items-center justify-center gap-[4px] rounded-[34px] bg-tag-preset-question-bg px-[12px] py-[8px]"
            >
              <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-preset-question-text">
                {getKoreanTag(tag)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 커스텀 태그 영역 */}
      {questionDto.questionPost?.customTags && questionDto.questionPost.customTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-[8px]">
          {questionDto.questionPost.customTags.map((tag, index) => {
            return (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-[10px] rounded-[34px] bg-tag-custom-bg px-[14px] py-[8px]"
              >
                <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-custom-text">
                  #{tag}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 구분선 */}
      <div className="mt-5 h-[1px] w-full bg-ui-muted"></div>

      {/* 좋아요 / 싫어요 인터랙션 영역 */}
      <div className="mb-[15px] mt-[15px] flex justify-center">
        <div className="flex w-full max-w-[433px] divide-x divide-transparent">
          <div className="flex flex-1 justify-center">
            <div
              onClick={!isLiked && !isAuthor ? handleLikeClick : undefined}
              className={`flex items-center gap-[4px] ${!isLiked && !isAuthor ? "cursor-pointer" : "cursor-default"}`}
            >
              <Image
                src={isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                width={14}
                height={14}
              />
              <span className={`text-SUIT_12 font-medium ${isLiked ? "text-legacy-teal" : "text-ui-count"}`}>
                {currentLikeCount}
              </span>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div
              onClick={!isDisliked && !isAuthor ? handleDislikeClick : undefined}
              className="flex cursor-pointer items-center gap-[4px]"
            >
              <Image
                src={isDisliked ? "/icons/newLikeThumbDownGreen.svg" : "/icons/newLikeThumbDownGray.svg"}
                alt={isDisliked ? "Dislike_Clicked" : "Dislike_UnClicked"}
                width={14}
                height={14}
              />
              <span className={`text-SUIT_12 font-medium ${isDisliked ? "text-question-main" : "text-ui-count"}`}>
                {currentDislikeCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-5 h-[4px] w-[calc(100%+40px)] rounded-[2px] bg-ui-divider-thick"></div>
====
      {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
      <div className="mt-4 flex flex-wrap items-center gap-1">
        {questionDto.questionPost?.isCurrentlyPopular && <HotTag />}
        <SubjectTag subjectName={questionDto.questionPost?.subject} type="question" />
        <BountyTag bounty={questionDto.questionPost?.bounty} />
        {questionDto.questionPost?.isAnswered && <AcceptTag />}
      </div>

      {/* 제목 영역 */}
      <div className="mt-4">
        <div className="flex h-auto w-full items-start justify-between">
          <h1 className="text-SUIT_18 font-semibold leading-[18px] text-black">{questionDto.questionPost?.title}</h1>
        </div>
        <div className="mt-2 flex items-center gap-1 text-SUIT_12 font-medium text-ui-muted">
          <span>@{questionDto.questionPost?.member?.uuidNickname}</span>
          <span>•</span>
          <span>{getDateDiff(questionDto.questionPost?.createdDate || "")}</span>
          <span>•</span>
          <span>조회수 {questionDto.questionPost?.viewCount}</span>
        </div>
      </div>

      {/* 본문 텍스트 영역 */}
      <div className="mt-4 text-SUIT_16 font-medium leading-[22.4px] text-black">
        <p className="whitespace-pre-wrap">{questionDto.questionPost?.content}</p>
      </div>

      {/* 미디어 파일 슬라이드 영역 */}
      {questionDto.questionFiles && questionDto.questionFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-3 pb-2.5">
            {questionDto.questionFiles.map((file, index) => (
              <div
                key={file.questionFileId || index}
                className="flex h-30 w-30 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ui-divider-thick"
              >
                <Image
                  src={file.fileUrl || "/image/default-file.png"}
                  alt={`attachment-${index}`}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 질문 태그 영역 */}
      {questionDto.questionPost?.documentTypes && questionDto.questionPost.documentTypes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {questionDto.questionPost.documentTypes.map((tag, index) => (
            <div
              key={index}
              className="flex h-7 w-auto min-w-[69px] flex-shrink-0 items-center justify-center gap-1 rounded-full bg-tag-preset-question-bg px-3 py-2"
            >
              <span className="line-clamp-1 overflow-hidden text-ellipsis text-SUIT_12 font-bold leading-[100%] text-tag-preset-question-text">
                {getKoreanTag(tag)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 커스텀 태그 영역 */}
      {questionDto.questionPost?.customTags && questionDto.questionPost.customTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {questionDto.questionPost.customTags.map((tag, index) => {
            return (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-tag-custom-bg px-3.5 py-2"
              >
                <span className="line-clamp-1 overflow-hidden text-ellipsis text-SUIT_12 font-bold leading-[100%] text-tag-custom-text">
                  #{tag}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 구분선 */}
      <div className="mt-5 h-px w-full bg-ui-muted"></div>

      {/* 좋아요 / 싫어요 인터랙션 영역 */}
      <div className="mb-3.75 mt-3.75 flex justify-center">
        <div className="flex w-full max-w-[433px] divide-x divide-transparent">
          <div className="flex flex-1 justify-center">
            <div
              onClick={!isLiked && !isAuthor ? handleLikeClick : undefined}
              className={`flex items-center gap-1 ${!isLiked && !isAuthor ? "cursor-pointer" : "cursor-default"}`}
            >
              <Image
                src={isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                width={14}
                height={14}
              />
              <span className={`text-SUIT_12 font-medium ${isLiked ? "text-legacy-teal" : "text-ui-count"}`}>
                {currentLikeCount}
              </span>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div
              onClick={!isDisliked && !isAuthor ? handleDislikeClick : undefined}
              className="flex cursor-pointer items-center gap-1"
            >
              <Image
                src={isDisliked ? "/icons/newLikeThumbDownGreen.svg" : "/icons/newLikeThumbDownGray.svg"}
                alt={isDisliked ? "Dislike_Clicked" : "Dislike_UnClicked"}
                width={14}
                height={14}
              />
              <span className={`text-SUIT_12 font-medium ${isDisliked ? "text-question-main" : "text-ui-count"}`}>
                {currentDislikeCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-5 h-1 w-[calc(100%+40px)] rounded-sm bg-ui-divider-thick"></div>
>>>>
```

`src/components/questionDetail/AnswerSection.tsx` 교체:
```typescript
<<<<
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await answerPostApi.getAnswersByQuestion({ questionPostId: postId });
        setAnswers(response.answerPosts || []);
      } catch (error) {
        console.error("답변 로드 실패:", error);
        setLoadError("답변을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, [postId]);

  if (isLoading) {
    return <p className="text-center text-SUIT_14 font-medium text-ui-body-soft">답변을 불러오는 중입니다...</p>;
  }

  if (loadError) {
    return <p className="text-center text-SUIT_14 font-medium text-ui-error">{loadError}</p>;
  }

  // 채택된 답변이 있는지 확인
  const hasChaetaekAnswer = answers.some(answer => answer.isChaetaek);

  return (
    <div className="flex h-auto flex-col">
      {answers.length === 0 ? (
        <p className="text-center text-SUIT_14 font-medium text-ui-muted">아직 답변이 없습니다.</p>
      ) : (
        answers.map((answerPost, index) => (
          <div key={answerPost.answerPostId || index} className="flex flex-col">
            <div className="flex">
              <div className="mr-[8px] pt-[2px]">
                {/* 엽전 아이콘 또는 대답 아이콘 */}
                {answerPost.isChaetaek ? <ChaetaekAcceptTag /> : <ReplyTag />}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-SUIT_14 font-bold text-black">
                    @{answerPost.member?.uuidNickname || "익명"}
                  </span>
                  <span className="text-SUIT_12 font-medium text-ui-muted">
                    {getDateDiff(answerPost.createdDate || "")}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-[4px] text-SUIT_12 font-medium text-ui-muted">
                  <span>익명등급: {getDegreeName(answerPost.member?.tier)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col pl-[24px]">
              {/* 구분선 (첫 번째 요소 제외) */}
              {index !== 0 && <div className="my-4 h-[1px] w-full rounded-[2px] bg-ui-divider-thick" />}

              {/* 채택 상태 가이드 바 */}
              {answerPost.isChaetaek && (
                <div className="flex items-center gap-[4px]">
                  <Image src="/icons/Circle_Accept.svg" alt="채택" width={14} height={14} />
                  <span className="text-SUIT_12 font-bold text-legacy-accept-blue">질문자가 채택한 답변입니다.</span>
                </div>
              )}

              {/* 답변 상세 텍스트 */}
              <p className="mt-4 line-clamp-1 text-SUIT_14 font-medium leading-[19.6px] text-black">
                {answerPost.content}
              </p>

              {/* 이미지 슬라이드 영역 */}
              {answerPost.answerFiles && answerPost.answerFiles.length > 0 && (
                <div className="mt-2 flex gap-[8px] overflow-x-auto">
                  {answerPost.answerFiles.map((file, idx) => (
                    <Image
                      key={file.answerFileId || idx}
                      src={file.fileUrl || "/image/default-file.png"}
                      alt={`answer-attachment-${idx}`}
                      width={90}
                      height={90}
                      className="h-[90px] w-[90px] flex-shrink-0 rounded-[8px] object-cover"
                    />
                  ))}
                </div>
              )}

              {/* 답변 좋아요 / 채택 버튼 */}
              <div className="mt-4 flex items-center gap-[8px]">
                {/* 답변 좋아요 */}
                <div
                  onClick={() => answerPost.answerPostId && handleLikeClick(answerPost.answerPostId)}
                  className="flex cursor-pointer items-center gap-[4px]"
                >
                  <Image
                    src={answerPost.isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                    alt="좋아요"
                    width={14}
                    height={14}
                  />
                  <span
                    className={`text-[12px] font-medium leading-[100%] ${answerPost.isLiked ? "text-question-main" : "text-ui-count"}`}
                  >
                    {answerPost.likeCount || 0}
                  </span>
                </div>
====
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await answerPostApi.getAnswersByQuestion({ questionPostId: postId });
        setAnswers(response.answerPosts || []);
      } catch (error) {
        console.error("답변 로드 실패:", error);
        setLoadError("답변을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, [postId]);

  if (isLoading) {
    return <p className="text-center text-SUIT_14 font-medium text-ui-body-soft">답변을 불러오는 중입니다...</p>;
  }

  if (loadError) {
    return <p className="text-center text-SUIT_14 font-medium text-ui-error">{loadError}</p>;
  }

  // 채택된 답변이 있는지 확인
  const hasChaetaekAnswer = answers.some(answer => answer.isChaetaek);

  return (
    <div className="flex h-auto flex-col">
      {answers.length === 0 ? (
        <p className="text-center text-SUIT_14 font-medium text-ui-muted">아직 답변이 없습니다.</p>
      ) : (
        answers.map((answerPost, index) => (
          <div key={answerPost.answerPostId || index} className="flex flex-col">
            <div className="flex">
              <div className="mr-2 pt-0.5">
                {/* 엽전 아이콘 또는 대답 아이콘 */}
                {answerPost.isChaetaek ? <ChaetaekAcceptTag /> : <ReplyTag />}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-SUIT_14 font-bold text-black">
                    @{answerPost.member?.uuidNickname || "익명"}
                  </span>
                  <span className="text-SUIT_12 font-medium text-ui-muted">
                    {getDateDiff(answerPost.createdDate || "")}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-SUIT_12 font-medium text-ui-muted">
                  <span>익명등급: {getDegreeName(answerPost.member?.tier)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col pl-6">
              {/* 구분선 (첫 번째 요소 제외) */}
              {index !== 0 && <div className="my-4 h-px w-full rounded-sm bg-ui-divider-thick" />}

              {/* 채택 상태 가이드 바 */}
              {answerPost.isChaetaek && (
                <div className="flex items-center gap-1">
                  <Image src="/icons/Circle_Accept.svg" alt="채택" width={14} height={14} />
                  <span className="text-SUIT_12 font-bold text-legacy-accept-blue">질문자가 채택한 답변입니다.</span>
                </div>
              )}

              {/* 답변 상세 텍스트 */}
              <p className="mt-4 line-clamp-1 text-SUIT_14 font-medium leading-[19.6px] text-black">
                {answerPost.content}
              </p>

              {/* 이미지 슬라이드 영역 */}
              {answerPost.answerFiles && answerPost.answerFiles.length > 0 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {answerPost.answerFiles.map((file, idx) => (
                    <Image
                      key={file.answerFileId || idx}
                      src={file.fileUrl || "/image/default-file.png"}
                      alt={`answer-attachment-${idx}`}
                      width={90}
                      height={90}
                      className="h-22.5 w-22.5 flex-shrink-0 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}

              {/* 답변 좋아요 / 채택 버튼 */}
              <div className="mt-4 flex items-center gap-2">
                {/* 답변 좋아요 */}
                <div
                  onClick={() => answerPost.answerPostId && handleLikeClick(answerPost.answerPostId)}
                  className="flex cursor-pointer items-center gap-1"
                >
                  <Image
                    src={answerPost.isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                    alt="좋아요"
                    width={14}
                    height={14}
                  />
                  <span
                    className={`text-SUIT_12 font-medium leading-[100%] ${answerPost.isLiked ? "text-question-main" : "text-ui-count"}`}
                  >
                    {answerPost.likeCount || 0}
                  </span>
                </div>
>>>>
```

`src/components/questionDetail/CommentList.tsx` 교체:
```typescript
<<<<
  return (
    <div className="mt-3 flex flex-col gap-[12px] bg-ui-tag-bg p-[14px]">
      {comments.length === 0 ? (
        <p className="font-pretendard-medium text-[14px] text-ui-body-soft">댓글이 없습니다.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={comment.commentId} className="min-h-[88px] min-w-[310px] rounded-lg bg-white p-[14px]">
            <div className="mb-[4px] flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex gap-[4px]">
                  <span className="font-pretendard-bold text-[14px]">@{comment.member.uuidNickname}</span>
                  {comment.isPrivate && (
                    <span className="font-pretendard-medium text-[12px] text-ui-body-soft">비공개</span>
                  )}
                </div>
                <span className="text-[12px] font-medium text-ui-muted">
                  익명등급: {getDegreeName(comment.member.tier)}
                </span>
              </div>
              <span className="text-[12px] font-medium text-ui-muted">
                {getDateDiff(comment.createdDate || "")}
              </span>
            </div>
            <p className="font-pretendard-medium min-h-[20px] w-full text-[14px] text-ui-body-soft">
              {comment.content}
            </p>
            <div className="font-pretendard-medium mb-[10px] text-[12px] text-ui-muted"></div>
          </div>
        ))
      )}
    </div>
  );
====
  return (
    <div className="mt-3 flex flex-col gap-3 bg-ui-tag-bg p-3.5">
      {comments.length === 0 ? (
        <p className="font-pretendard-medium text-SUIT_14 text-ui-body-soft">댓글이 없습니다.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={comment.commentId} className="min-h-22 min-w-77.5 rounded-lg bg-white p-3.5">
            <div className="mb-1 flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex gap-1">
                  <span className="font-pretendard-bold text-SUIT_14">@{comment.member.uuidNickname}</span>
                  {comment.isPrivate && (
                    <span className="font-pretendard-medium text-SUIT_12 text-ui-body-soft">비공개</span>
                  )}
                </div>
                <span className="text-SUIT_12 font-medium text-ui-muted">
                  익명등급: {getDegreeName(comment.member.tier)}
                </span>
              </div>
              <span className="text-SUIT_12 font-medium text-ui-muted">
                {getDateDiff(comment.createdDate || "")}
              </span>
            </div>
            <p className="font-pretendard-medium min-h-[20px] w-full text-SUIT_14 text-ui-body-soft">
              {comment.content}
            </p>
            <div className="font-pretendard-medium mb-2.5 text-SUIT_12 text-ui-muted"></div>
          </div>
        ))
      )}
    </div>
  );
>>>>
```

`src/components/questionDetail/ChaetaekCheckModal.tsx` 교체:
```typescript
<<<<
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" />
      <div
        className="relative z-10 h-48 w-[336px] rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/image/chaetaek-modal-bg.png')" }}
      >
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-[20px]">
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-ui-divider-light pb-[20px] pt-[10px] text-center text-[16px]">
            정말 채택하시겠소? <br /> 채택 시 엽전 거래가 완료되오.
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              onClick={onClose}
              type="button"
              className="font-pretendard-semibold h-[30px] w-[140px] rounded-lg border border-legacy-accept-blue bg-white text-[14px] text-legacy-accept-blue"
            >
              아니오
            </button>
            <button
              onClick={handleConfirm}
              type="button"
              className="font-pretendard-semibold h-[30px] w-[140px] rounded-lg bg-legacy-accept-blue text-[14px] text-white"
            >
              예
            </button>
          </div>
        </div>
      </div>
    </div>
  );
====
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xl" />
      <div
        className="relative z-10 h-48 w-84 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/image/chaetaek-modal-bg.png')" }}
      >
        <div className="flex h-48 w-84 flex-col items-center justify-center rounded-2xl bg-white/50 p-5">
          <h1 className="font-pretendard-bold pb-2.5 text-SUIT_18">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-ui-divider-light pb-5 pt-2.5 text-center text-SUIT_16">
            정말 채택하시겠소? <br /> 채택 시 엽전 거래가 완료되오.
          </div>
          <div className="flex h-7.5 w-full justify-between">
            <button
              onClick={onClose}
              type="button"
              className="font-pretendard-semibold h-7.5 w-35 rounded-lg border border-legacy-accept-blue bg-white text-SUIT_14 text-legacy-accept-blue"
            >
              아니오
            </button>
            <button
              onClick={handleConfirm}
              type="button"
              className="font-pretendard-semibold h-7.5 w-35 rounded-lg bg-legacy-accept-blue text-SUIT_14 text-white"
            >
              예
            </button>
          </div>
        </div>
      </div>
    </div>
  );
>>>>
```

`src/components/questionDetail/ChaetaekSuccessModal.tsx` 교체:
```typescript
<<<<
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" />
      <div
        className="relative z-10 h-48 w-[336px] rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/image/chaetaek-modal-bg.png')" }}
      >
        <div className="flex h-48 w-[336px] flex-col items-center justify-center rounded-2xl bg-white/50 p-[20px]">
          <h1 className="font-pretendard-bold pb-[10px] text-[18px]">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-ui-divider-light pb-[20px] pt-[10px] text-center text-[16px]">
            채택이 완료되었소! <br /> 거래된 엽전은 낙장이입이오.
          </div>
          <div className="flex h-[30px] w-full justify-between">
            <button
              onClick={onClose}
              type="button"
              className="font-pretendard-semibold h-[30px] w-full rounded-lg bg-legacy-accept-blue text-[14px] text-white"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
====
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xl" />
      <div
        className="relative z-10 h-48 w-84 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: "url('/image/chaetaek-modal-bg.png')" }}
      >
        <div className="flex h-48 w-84 flex-col items-center justify-center rounded-2xl bg-white/50 p-5">
          <h1 className="font-pretendard-bold pb-2.5 text-SUIT_18">답변 채택</h1>
          <div className="font-pretendard-medium w-full border-t-2 border-ui-divider-light pb-5 pt-2.5 text-center text-SUIT_16">
            채택이 완료되었소! <br /> 거래된 엽전은 낙장이입이오.
          </div>
          <div className="flex h-7.5 w-full justify-between">
            <button
              onClick={onClose}
              type="button"
              className="font-pretendard-semibold h-7.5 w-full rounded-lg bg-legacy-accept-blue text-SUIT_14 text-white"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
>>>>
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git commit -m "질문상세 UI 토큰화 수술 : refactor : 질문상세 5개 컴포넌트 내의 비표준 픽셀 30여 건을 테일윈드 및 전역 폰트 토큰으로 완전 수렴 정렬 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 3: Step 5 - 공통 검색바 SearchBar.tsx UI 픽셀 수술

**Files:**
- Modify: `src/components/common/SearchBar.tsx` (잔여 픽셀 52px, 18px 제거 및 토큰 정렬)

- [ ] **Step 1: SearchBar.tsx 픽셀 전면 대치**

`src/components/common/SearchBar.tsx` 의 잔여 픽셀 교체:
```typescript
<<<<
        <div className="relative mx-auto flex h-[52px] w-full items-center overflow-hidden rounded-lg bg-white">
          <button type="button" onClick={handleSearch} className="z-10 flex h-full items-center justify-center pr-1.5">
            {/* subject 영역 */}
            {isSubjectPage ? (
              <span className="z-10 ml-[18px] mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">
                {subject}
              </span>
            ) : (
              <Search className="z-10 ml-[18px] mr-2 h-6 w-6 text-ui-muted" />
            )}
          </button>

          {/* 입력 필드 */}
          <input
            type="text"
            value={searchValue}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIndex] || "검색어를 입력하세요."}
            className={`z-10 flex-1 bg-transparent text-SUIT_16 font-medium text-black placeholder-ui-muted focus:outline-none ${
              subject ? "" : "pl-[18px]"
            }`}
          />
====
        <div className="relative mx-auto flex h-13 w-full items-center overflow-hidden rounded-lg bg-white">
          <button type="button" onClick={handleSearch} className="z-10 flex h-full items-center justify-center pr-1.5">
            {/* subject 영역 */}
            {isSubjectPage ? (
              <span className="z-10 ml-4.5 mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">
                {subject}
              </span>
            ) : (
              <Search className="z-10 ml-4.5 mr-2 h-6 w-6 text-ui-muted" />
            )}
          </button>

          {/* 입력 필드 */}
          <input
            type="text"
            value={searchValue}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIndex] || "검색어를 입력하세요."}
            className={`z-10 flex-1 bg-transparent text-SUIT_16 font-medium text-black placeholder-ui-muted focus:outline-none ${
              subject ? "" : "pl-4.5"
            }`}
          />
>>>>
```

`SearchBar.tsx` 의 두 번째 픽셀 영역 교체:
```typescript
<<<<
        <div className={`flex h-[52px] w-full items-center rounded-lg border-2 bg-white ${colorClasses.border}`}>
          {/* 과목 표시 */}
          <div className="flex flex-1 items-center pl-[18px]">
            {subject && <span className="mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">{subject}</span>}
====
        <div className={`flex h-13 w-full items-center rounded-lg border-2 bg-white ${colorClasses.border}`}>
          {/* 과목 표시 */}
          <div className="flex flex-1 items-center pl-4.5">
            {subject && <span className="mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">{subject}</span>}
>>>>
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git commit -m "검색바 UI 토큰화 수술 : refactor : SearchBar 내에 잔존하던 52px, 18px 픽셀 하드코딩 5건을 테일윈드 규격 그리드로 완전 수렴 통일 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] 마이페이지, 질문상세, 공통검색바 내의 모든 비표준 픽셀 수술 완료
- [ ] `npm run build` 가 에러나 타입 누락 없이 통과
- [ ] 정식 커밋 생성 및 원격 선형적 동기화 완료
- [ ] Phase 5 완전 정복 종료
