/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import AnswerSection from "./AnswerSection";
import getDateDiff from "@/global/getDateDiff";
import { QuestionData } from "@/types/apiTypes/QuestionDetailData";
import CommentSection from "./QCommentSection";
import sameMember from "@/global/sameMember";
import AttachedFiles from "@/components/common/AttachedFiles";
import JiJeongTag from "@/components/deprecated/JiJeongTag";

// 한국어 태그 매핑
const tagMapping: { [key: string]: string } = {
  OUT_OF_CLASS: "수업 외 내용",
  UNKNOWN_CONCEPT: "개념 모름",
  BETTER_SOLUTION: "더 나은 풀이",
  EXAM_PREPARATION: "시험 대비",
  DOCUMENT_REQUEST: "자료 요청",
  STUDY_TIPS: "공부 팁",
  ADVICE_REQUEST: "조언 구함",
};

// 영어 태그를 한국어로 변환하는 함수
const getKoreanTag = (englishTag: string): string => {
  return tagMapping[englishTag] || englishTag; // 매핑되지 않은 경우 원래의 태그 반환
};

function QnaDetail({ questionData }: { questionData: QuestionData }) {
  const [isLiked, setIsLiked] = useState(questionData.questionPost.isLiked); // API 응답 값으로 초기화
  const [currentLikeCount, setCurrentLikeCount] = useState(questionData.questionPost.likeCount);

  const isAuthor: boolean = sameMember(questionData.questionPost.member.memberId); // 작성자 여부 확인

  const handleLikeClick = async () => {
    if (isLiked) return; // 이미 좋아요를 누른 상태라면 실행하지 않음
    if (sameMember(questionData.questionPost.member.memberId)) return; // 작성자가 좋아요를 누르지 못하도록 차단

    try {
      setIsLiked(true); // 즉시 반영: 버튼 비활성화 및 색상 변경
      setCurrentLikeCount(currentLikeCount + 1); // 즉시 반영: 좋아요 숫자 증가

      await postLikeQuestion(questionData.questionPost.questionPostId, "QUESTION");
    } catch (error) {
      console.error("좋아요 업데이트 실패");
      setIsLiked(false); // 실패 시 롤백
      setCurrentLikeCount(currentLikeCount - 1); // 숫자도 원래대로 롤백
    }
  };

  const buttonClass = isLiked
    ? "border-[#03b89e] text-[#03b89e] cursor-default" // 눌린 상태
    : "border-[#e7e7e7] text-[#aaaaaa] cursor-pointer"; // 기본 상태

  const [commentCount, setCommentCount] = useState(questionData.questionPost.commentCount);
  const incrementCommentCount = () => {
    setCommentCount(prevCount => prevCount + 1);
  };

  const files = questionData.mediaFiles.map(file => file.uploadedImageUrl);

  return (
    <div className="flex flex-col justify-center px-[20px]">
      {/* 교과목명 현상금  */}
      <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
        <div className="flex items-center gap-[6px]">
          {questionData.questionPost.chaetaekStatus ? (
            <>
              <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#0062D2] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
                채택됨
              </div>
              <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#03b89e] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
                {questionData.questionPost.subject}
              </div>
            </>
          ) : (
            <>
              <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#03b89e] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
                {questionData.questionPost.subject}
              </div>
              {questionData.questionPost.rewardYeopjeon > 0 && (
                <span className="font-pretendard-semibold mr-1 inline-flex h-[26px] items-center rounded-[33px] bg-custom-orange-500 px-2 py-[3px] text-xs text-white">
                  <img src="/icons/Yeopjeon.svg" alt="Yeopjeon" className="inline-block h-[14px] w-[14px]" />
                  <span className="ml-1">{questionData.questionPost.rewardYeopjeon}</span>
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {/* 글 정보 */}
      <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <span className="font-pretendard-bold text-[18px]">{questionData.questionPost.title}</span>
          <div className="font-pretendard-medium mt-[10px] text-[14px] leading-normal text-[#727272]">
            {questionData.questionPost.content}
          </div>
        </div>

        {/* 커스텀태그 */}
        {questionData.customTags && questionData.customTags.length > 0 && (
          <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
            <div className="flex h-full w-full items-center gap-[4px]">
              {questionData.customTags.map((tag, index) => (
                <JiJeongTag
                  key={index}
                  title={tag}
                  color="#aaaaaa"
                />
              ))}
            </div>
          </div>
        )}
        {/* 첨부파일 */}
        {files.length > 0 && ( // 파일이 있을 때만 렌더링
          <div className="justfy-center my-4 flex">
            <AttachedFiles files={files} />
          </div>
        )}

        {/* 지정태그 */}
        <div className="mt-[20px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex items-center gap-[10px]">
            {questionData.questionPost.questionPresetTags.map((tag, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex h-[25px] w-auto items-center justify-center rounded-[28px] border border-[#e7e7e7] px-[10px]"
              >
                <span className="font-pretendard-medium text-[14px] text-[#aaaaaa]">{getKoreanTag(tag)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-[72px] min-w-[336px] max-w-[640px] flex-col">
          <div className="mt-[20px] text-right">
            <div>
              <span className="font-pretendard-medium mb-[4px] text-[12px]">
                {questionData.questionPost.isPrivate ? "익명" : `@${questionData.questionPost.member.uuidNickname}`}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">
                {getDateDiff(questionData.questionPost.createdDate)}
              </span>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">
                • 조회수 {questionData.questionPost.viewCount}
              </span>
            </div>
          </div>
        </div>
        {/* 좋아요 */}
        <div className="mx-[5px] mt-4 flex justify-start">
          <div className="flex items-center gap-[10px]">
            <div
              onClick={!isLiked ? handleLikeClick : undefined} // 이미 눌렀다면 클릭 비활성화
              className={`flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 ${buttonClass}`}
            >
              <Image
                src={isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_UnClicked.svg"}
                alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                width={16}
                height={16}
              />
              <span className={`font-pretendard-semibold text-[12px] ${isLiked ? "text-[#03b89e]" : "text-[#aaaaaa]"}`}>
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
                    댓글 {commentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-[400px] overflow-y-auto">
                  <CommentSection
                    postId={questionData.questionPost.questionPostId}
                    contentType="QUESTION"
                    onCommentAdded={incrementCommentCount}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      {/* 답변 */}
      <AnswerSection postId={questionData.questionPost.questionPostId} isAuthor={isAuthor} />
    </div>
  );
}

export default QnaDetail;
