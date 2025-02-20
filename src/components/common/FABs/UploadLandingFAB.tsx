"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Close from "@/../public/icons/Close.svg";
import DocumentIcon from "@/../public/icons/Document.svg";
import QuestionIcon from "@/../public/icons/Question.svg";
import Upload from "@/../public/icons/Upload.svg";

function UploadFAB() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false); // Dropdown 상태 관리

  const checkAccessTokenAndNavigate = (path: string) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  const handleDocumentClick = () => {
    checkAccessTokenAndNavigate("board/document/post");
  };

  const handleQuestionClick = () => {
    checkAccessTokenAndNavigate("/board/question/post");
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button type="button" className="relative z-50 h-[50px] w-[50px] rounded-full bg-[#03b89e] shadow-lg">
            {isOpen ? <Close /> : <Upload />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="relative mb-[5px] flex w-auto flex-col items-center gap-[10px]">
            <DropdownMenuItem className="flex items-center gap-[10px]">
              <span className="font-pretendard-medium w-[70px] text-right text-[14px] text-white">질문 올리기</span>
              <button
                type="button"
                className="flex h-[50px] w-[50px] rounded-full bg-white shadow"
                onClick={handleQuestionClick}
              >
                <QuestionIcon className="h-[50px] w-[50px] text-[#03b89e]" />
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-[10px]">
              <span className="font-pretendard-medium w-[70px] text-right text-[14px] text-white">자료 올리기</span>
              <button
                type="button"
                className="flex h-[50px] w-[50px] rounded-full bg-white shadow"
                onClick={handleDocumentClick}
              >
                <DocumentIcon className="h-[50px] w-[50px] text-[#03b89e]" />
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UploadFAB;
