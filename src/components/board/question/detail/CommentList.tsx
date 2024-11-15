import React from "react";

interface CommentProps {
  postId: string;
  uuidNickname: string;
  isPrivate: boolean;
  content: string;
  createdDate: string;
}

interface CommentListProps {
  comments: CommentProps[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <div>
      {comments.length === 0 ? (
        <p className="font-pretendard-medium text-[14px] text-[#7b7b7c]">댓글이 없습니다.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.postId} className="min-h-[88px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
            {!comment.isPrivate ? (
              <span className="font-pretendard-bold mb-[4px] text-[14px]">@{comment.uuidNickname}</span>
            ) : (
              <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]">비공개</span>
            )}
            <p className="font-pretendard-medium min-h-[20px] w-full text-[14px] text-[#7b7b7c]">{comment.content}</p>
            <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">
              {new Date(comment.createdDate).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;
