"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToast } from "@/global/store/toastSlice";
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import CommonContextMenu from "@/components/common/CommonContextMenu";

interface CommentProps {
  commentId: string;
  createdDate: string;
  member: {
    uuidNickname: string;
    major: string;
  };
  content: string;
  isPrivate: boolean;
}

interface CommentListProps {
  comments: CommentProps[];
}

function CommentList({ comments }: CommentListProps) {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const showToast = (message: string, color: "blue" | "orange" | "green" = "orange") => {
    dispatch(
      addToast({
        id: Date.now().toString(),
        icon: <ToastIcon color={color} />,
        title: message,
        color,
        action: (
          <ToastAction color={color} altText="확인">
            확인
          </ToastAction>
        ),
      }),
    );
  };
  return (
    <div>
      {comments.length === 0 ? (
        <p className="font-pretendard-medium text-[14px] text-[#7b7b7c]">댓글이 없습니다.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.commentId} className="min-h-[88px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
            <div className="mb-[4px] flex items-start justify-between">
              <div className="flex-1">
                {!comment.isPrivate ? (
                  <span className="font-pretendard-bold text-[14px]">@{comment.member.uuidNickname}</span>
                ) : (
                  <span className="font-pretendard-medium text-[12px] text-[#737373]">비공개</span>
                )}
              </div>
              {/* 메뉴 버튼 */}
              <button
                type="button"
                ref={el => {
                  menuButtonRefs.current[comment.commentId] = el;
                }}
                onClick={() => setOpenMenuId(openMenuId === comment.commentId ? null : comment.commentId)}
                className="flex-shrink-0 p-1"
              >
                <Image src="/icons/three-dots-vertical.svg" alt="멤뉴" width={20} height={20} />
              </button>
            </div>
            <p className="font-pretendard-medium min-h-[20px] w-full text-[14px] text-[#7b7b7c]">{comment.content}</p>
            <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">
              {new Date(comment.createdDate).toLocaleDateString()}
            </div>
          </div>
        ))
      )}

      {/* 컨텍스트 메뉴 */}
      {openMenuId && menuButtonRefs.current[openMenuId] && (
        <CommonContextMenu
          isOpen
          onClose={() => setOpenMenuId(null)}
          triggerRef={{ current: menuButtonRefs.current[openMenuId] }}
          onReport={() => {
            showToast("신고 기능이 준비 중입니다.", "orange");
          }}
          onBlock={() => {
            showToast("차단 기능이 준비 중입니다.", "orange");
          }}
        />
      )}
    </div>
  );
}

export default CommentList;
