/* eslint-disable */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import JiJeongTag from "@/components/common/tags/JiJeongTag";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import YeopjeonTag from "../../tags/YeopjeonTag";
import likePost from "@/apis/question/likePost";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import getComments from "@/apis/question/getComment";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import AnswerSection from "./AnswerSection";
import { Answer } from "@/types/answer";

interface QnaDetailProps {
  postId: string;
  subject: string;
  rewardYeopjeon: number;
  title: string;
  content: string;
  questionPresetTags: string[];
  uuidNickname: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  answerCount: number;
}

function QnaDetail({
  postId,
  subject,
  rewardYeopjeon,
  title,
  content,
  questionPresetTags,
  uuidNickname,
  createdDate,
  viewCount,
  likeCount,
  commentCount,
  answerCount,
}: QnaDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentCommentCount, setCurrentCommentCount] = useState(commentCount);
  const [questionComments, setQuestionComments] = useState<any[]>([]);
  const [answerComments, setAnswerComments] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]); 

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await getQuestionDetails(postId);
        if (response.answerPosts) {
          const mappedAnswers = response.answerPosts.map((answer: any) => ({
            answerPostId: answer.answerPostId,
            member: {
              uuidNickname: answer.member.uuidNickname,
              major: answer.member.major,
            },
            content: answer.content,
            createdDate: answer.createdDate,
            commentCount: answer.commentCount || 0,
          }));
          setAnswers(mappedAnswers);
        }
      } catch (error) {
        console.error("Failed to fetch question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        const response = await likePost(postId, "QUESTION");
        if (response) {
          setIsLiked(true);
          setCurrentLikeCount(currentLikeCount + 1);
        }
      }
    } catch (error) {
      console.error("Failed to handle like click:", error);
    }
  };

  const fetchComments = async (contentType: string, setComments: React.Dispatch<React.SetStateAction<any[]>>, setCount?: (count: number) => void) => {
    try {
      const response = await getComments({ postId, contentType });
      if (response?.commentsPage?.content) {
        setComments(response.commentsPage.content);
        if (setCount) {
          setCount(response.commentsPage.totalElements);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${contentType.toLowerCase()} comments:`, error);
    }
  };

  const refreshComments = (contentType: string) => {
    fetchComments(contentType, 
      contentType === "QUESTION" ? setQuestionComments : setAnswerComments, 
      contentType === "QUESTION" ? setCurrentCommentCount : undefined
    );
  };

  useEffect(() => {
    fetchComments("QUESTION", setQuestionComments, setCurrentCommentCount);
    fetchComments("ANSWER", setAnswerComments);
  }, [postId]);

  return (
    <div className="flex flex-col justify-center px-[20px]">
      {/* 교과목명 현상금  */}
      <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
        <div className="flex items-center gap-[6px]">
          <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#03b89e] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
            {subject}
          </div>
          <YeopjeonTag point={rewardYeopjeon} />
        </div>
      </div>
      {/* 글 정보 */}
      <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <span className="font-pretendard-bold text-[18px]">{title}</span>
          <div className="font-pretendard-medium mt-[10px] text-[14px] leading-normal text-[#727272]">{content}</div>
        </div>
        {/* 커스텀태그 */}
        <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex h-full w-full items-center gap-[4px]">
            <JiJeongTag title="차" color="#aaaaaa" />
            <JiJeongTag title="문화" color="#aaaaaa" />
            <JiJeongTag title="수업정리본" color="#aaaaaa" />
          </div>
        </div>
        {/* 지정태그 */}
        <div className="mt-[20px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex items-center gap-[10px]">
            {questionPresetTags.map((tag, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex h-[25px] w-auto items-center justify-center rounded-[28px] border border-[#e7e7e7] px-[10px]"
              >
                <span className="font-pretendard-medium text-[14px] text-[#aaaaaa]">{tag}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-[72px] min-w-[336px] max-w-[640px] flex-col">
          <div className="mt-[20px] text-right">
            <div>
              <span className="font-pretendard-medium mb-[4px] text-[12px]">@{uuidNickname}</span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">{createdDate}</span>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]"> • 조회수 {viewCount}</span>
            </div>
          </div>
        </div>
        {/* 좋아요 */}
        <div className="mx-[5px] mt-4 flex justify-start">
          <div className="flex items-center gap-[10px]">
          <div
      onClick={handleLikeClick}
      className={`flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 ${
        isLiked ? "border-[#03b89e]" : "border-[#e7e7e7]"
      } cursor-pointer`}
    >
      <Image
        src={isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_UnClicked.svg"}
        alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
        width={16}
        height={16}
      />
      <span
        className={`font-pretendard-semibold text-[12px] ${
          isLiked ? "text-[#03b89e]" : "text-[#aaaaaa]"
        }`}
      >
        {currentLikeCount}
      </span>
    </div>
    {/* 질문 댓글 */}
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex h-[30px] w-[70px] cursor-pointer items-center justify-center gap-[5px] rounded-[28px] border-2 border-[#e7e7e7]">
                  <Image src="/icons/Comment_UnClicked.svg" alt="Comment_UnClicked" width={16} height={16} />
                  <span className="font-pretendard-semibold text-[12px] text-[#aaaaaa]">{commentCount}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="px-[20px] pb-[20px]">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="font-pretendard-bold flex text-[14px] text-[#3c3c3c]">
                    댓글 {currentCommentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-[400px] overflow-y-auto">
                <CommentInput postId={postId} contentType="QUESTION" refreshComments={() => refreshComments("QUESTION")}/>
                {/* 댓글 정보 */}
                <CommentList comments={questionComments}/>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      {/* 답변 */}
      <AnswerSection
        postId={postId}
        answers={answers}
        answerComments={answerComments}
        fetchAnswerComments={() => fetchComments("ANSWER", setAnswerComments)}
      />
    </div>
  );
}

export default QnaDetail;
