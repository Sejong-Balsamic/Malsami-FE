"use client";

import { useRouter, notFound } from "next/navigation";
import { PostTiersKeys, PostTiersKey } from "@/types/postTiers";
import CheonminBoard from "@/components/board/document/categories/CheonminBoard";
import JunginBoard from "@/components/board/document/categories/JunginBoard";
import YangbanBoard from "@/components/board/document/categories/YangbanBoard";
import KingBoard from "@/components/board/document/categories/KingBoard";
import useUserPermissions from "@/global/useUserPermissions";
import { showToast } from "@/global/toastUtils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// 게시판 컴포넌트 매핑
const MainDocTierComponents: Record<PostTiersKey, JSX.Element> = {
  CHEONMIN: <CheonminBoard />,
  JUNGIN: <JunginBoard />,
  YANGBAN: <YangbanBoard />,
  KING: <KingBoard />,
};

// 동적 라우팅
function BoardPage({ params }: { params: { postTier?: string } }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postTier } = params; // 동적라우팅 url 반환값
  const userPermissions = useUserPermissions(); // url 직접 접근 시, 사용자 등급 차단 확인
  const upperCasePostTier = postTier?.toUpperCase() as PostTiersKey; // 대문자로 변환. url이 소문자로 자동설정되어 params로 넘어오기 때문
  const [hasAccessChecked, setHasAccessChecked] = useState(false); // 접근 권한 확인 여부

  useEffect(() => {
    if (hasAccessChecked) return; // 한 번만 실행되도록

    // 허용된 카테고리가 아니면 notFound 페이지로 리다이렉트
    if (!PostTiersKeys.includes(upperCasePostTier)) {
      notFound();
      return;
    }

    // 티어 권한 검사
    const userAccessMap: Record<PostTiersKey, boolean> = {
      CHEONMIN: userPermissions.canAccessCheonmin,
      JUNGIN: userPermissions.canAccessJungin,
      YANGBAN: userPermissions.canAccessYangban,
      KING: userPermissions.canAccessKing,
    };

    // 티어 접근 권한이 없으면 토스트창 보여주고 자료게시판메인으로 이동
    if (!userAccessMap[upperCasePostTier]) {
      showToast(dispatch, "해당 자료게시판 접근 권한이 없습니다", "orange");
      router.push("/board/document");
    }

    setHasAccessChecked(true); // 권한 확인이 완료되었음을 설정
  }, [upperCasePostTier, userPermissions]);

  return <div>{MainDocTierComponents[upperCasePostTier]}</div>;
}

export default BoardPage;
