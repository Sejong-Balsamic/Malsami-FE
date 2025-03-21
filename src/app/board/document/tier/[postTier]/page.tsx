"use client";

import { useRouter, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/global/toastUtils";
import CheonminBoard from "@/components/documentMain/CheonminBoard";
import JunginBoard from "@/components/documentMain/JunginBoard";
import YangbanBoard from "@/components/documentMain/YangbanBoard";
import KingBoard from "@/components/documentMain/KingBoard";
import { PostTier } from "@/types/api/constants/postTier";
import useUserPermissions from "@/global/useUserPermissions";

// 게시판 컴포넌트 매핑
const MainDocTierComponents: Record<PostTier, JSX.Element> = {
  [PostTier.CHEONMIN]: <CheonminBoard />,
  [PostTier.JUNGIN]: <JunginBoard />,
  [PostTier.YANGBAN]: <YangbanBoard />,
  [PostTier.KING]: <KingBoard />,
};

// PostTier 값 배열 (유효성 검사용)
const validPostTiers = Object.values(PostTier) as PostTier[];

function BoardPage({ params }: { params: { postTier?: string } }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postTier } = params; // URL에서 동적 파라미터
  const memberInfo = useUserPermissions(); // MemberDto | null 반환
  const upperCasePostTier = postTier?.toUpperCase() as PostTier; // 타입 단언
  const [isAccessChecked, setIsAccessChecked] = useState(false);

  useEffect(() => {
    if (isAccessChecked || !memberInfo) return; // 체크 완료거나 memberInfo 없으면 종료

    // 유효한 PostTier인지 확인
    if (!validPostTiers.includes(upperCasePostTier)) {
      notFound();
      return;
    }

    // 권한 매핑
    const userAccessMap: Record<PostTier, boolean> = {
      [PostTier.CHEONMIN]: memberInfo.canAccessCheonmin ?? false,
      [PostTier.JUNGIN]: memberInfo.canAccessJungin ?? false,
      [PostTier.YANGBAN]: memberInfo.canAccessYangban ?? false,
      [PostTier.KING]: memberInfo.canAccessKing ?? false,
    };

    // 권한 없으면 리다이렉트
    if (!userAccessMap[upperCasePostTier]) {
      showToast(dispatch, "해당 자료게시판 접근 권한이 없습니다", "orange");
      router.push("/board/document");
    }

    setIsAccessChecked(true);
  }, [upperCasePostTier, memberInfo, dispatch, router, isAccessChecked]);

  // memberInfo가 없거나 권한 체크 전이면 로딩 상태
  if (!memberInfo || !isAccessChecked) return null;

  return <div>{MainDocTierComponents[upperCasePostTier]}</div>;
}

export default BoardPage;
