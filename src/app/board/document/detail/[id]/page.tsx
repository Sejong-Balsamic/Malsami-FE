"use client";

import axios from "axios";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import DocDetail from "@/components/documentDetail/DocDetail";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useDispatch } from "react-redux";
import { showToast } from "@/global/toastUtils";
import { Drawer, DrawerContent } from "@/components/shadcn/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import documentPostApi from "@/apis/documentPostApi";
import { DocumentDto } from "@/types/api/responses/documentDto";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [documentDetails, setDocumentDetails] = useState<DocumentDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drawer 열기/닫기 핸들러
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          const command: Partial<DocumentCommand> = {
            documentPostId: postId, // 게시글 ID 전달
          };
          const data = await documentPostApi.getDocumentPost(command);

          if (isMounted) {
            setDocumentDetails({
              ...data,
              documentPost: {
                ...data.documentPost,
                documentPostId: postId,
              },
            });
          }
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", innerError);
          if (isMounted && !error) {
            if (axios.isAxiosError(innerError)) {
              const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
              showToast(dispatch, message, "orange");
              setError(message);
              router.back();
            } else {
              showToast(dispatch, "예상치 못한 오류가 발생했습니다.", "orange");
              router.back();
            }
          }
        } finally {
          if (isMounted) {
            setIsLoading(false); // 로딩 상태 비활성화
          }
        }
      };

      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [postId, error, router, dispatch]);

  // 로딩 상태 처리
  if (isLoading) return <LoadingSpinner />;
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <CommonHeader title="자료 상세보기" rightType={RIGHT_ITEM.MENU} onRightClick={toggleDrawer} />
      {/* 헤더 아래 여백 추가 */}
      <div className="mt-[64px]">
        {documentDetails && <DocDetail documentDto={documentDetails} />}
        {/* Drawer 컴포넌트 */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <VisuallyHidden>
              <h1>Options</h1>
              <p>차피 안 보이는 부분</p>
            </VisuallyHidden>
            <div className="flex flex-col pb-[30px]">
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Share.svg" alt="option" width={12} height={15} />
                공유하기
              </Button>
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Block.svg" alt="option" width={12} height={12} />
                차단하기
              </Button>
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Report.svg" alt="option" width={12} height={12} />
                신고하기
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
