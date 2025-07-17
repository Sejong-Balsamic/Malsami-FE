/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import AnswerSection from "./AnswerSection";
import { getDateDiff } from "@/global/time";
import CommentSection from "./QCommentSection";
import sameMember from "@/global/sameMember";
import AttachedFiles from "@/components/common/AttachedFiles";
import PresetTag from "@/components/common/tags/PresetTag";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import HotTag from "@/components/common/tags/HotTag";
import { QuestionDto } from "@/types/api/responses/questionDto";

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

function QnaDetail({ questionDto }: { questionDto: QuestionDto }) {
  const [isLiked, setIsLiked] = useState(questionDto.questionPost?.isLiked); // API 응답 값으로 초기화
  const [currentLikeCount, setCurrentLikeCount] = useState(questionDto.questionPost?.likeCount as number);

  const isAuthor: boolean = sameMember(questionDto.questionPost?.member?.memberId as string); // 작성자 여부 확인
  // FIXME: 임시로 HOT 여부 체크 (향후 API에서 isHot으로 대체 예정)
  const isHot = questionDto.questionPost?.weeklyScore && questionDto.questionPost?.weeklyScore > 5;

  const handleLikeClick = async () => {
    if (isLiked) return; // 이미 좋아요를 누른 상태라면 실행하지 않음
    if (sameMember(questionDto.questionPost?.member?.memberId as string)) return; // 작성자가 좋아요를 누르지 못하도록 차단

    try {
      setIsLiked(true); // 즉시 반영: 버튼 비활성화 및 색상 변경
      setCurrentLikeCount(currentLikeCount + 1); // 즉시 반영: 좋아요 숫자 증가

      await postLikeQuestion(questionDto.questionPost?.questionPostId as string, "QUESTION");
    } catch (error) {
      console.error("좋아요 업데이트 실패");
      setIsLiked(false); // 실패 시 롤백
      setCurrentLikeCount(currentLikeCount - 1); // 숫자도 원래대로 롤백
    }
  };

  const buttonClass = isLiked
    ? "border-[#03b89e] text-[#03b89e] cursor-default" // 눌린 상태
    : "border-[#e7e7e7] text-[#aaaaaa] cursor-pointer"; // 기본 상태

  const [commentCount, setCommentCount] = useState(questionDto.questionPost?.commentCount);
  const incrementCommentCount = () => {
    setCommentCount(prevCount => (prevCount as number) + 1);
  };

  const files = questionDto.mediaFiles?.map(file => file.uploadedImageUrl) as string[];

  return (
    <div className="flex flex-col justify-center">
      {/* 태그 영역 (HOT, 교과목명, 현상금) */}
      <div className="mt-[12px] flex flex-wrap items-center gap-[4px]">
        {isHot && <HotTag />}

        {/* 과목/채택 */}
        {questionDto.questionPost?.chaetaekStatus && (
          <div className="inline-flex h-[32px] items-center justify-center rounded bg-[#3D8BFF] px-[6px] py-[4px]">
            <span className="text-SUIT_12 font-bold text-white">채택됨</span>
          </div>
        )}

        {/* 과목명 태그 */}
        <SubjectTag subject={questionDto.questionPost?.subject} postType="question" />

        {/* 엽전 태그 */}
        <RewardTag amount={questionDto.questionPost?.rewardYeopjeon as number} />
      </div>

      {/* 글 정보 */}
      <div className="flex w-full flex-col">
        <div className="mt-[12px]">
          <h1 className="text-SUIT_18 font-semibold leading-[18px] text-black">
            {questionDto.questionPost?.title}
          </h1>
          
          {/* 소과목/작성일자/조회수 */}
          <div className="mt-[4px] flex items-center">
            <span className="text-SUIT_12 font-medium text-[#ACACAC] mr-[3px]">
              {questionDto.questionPost?.subject}
            </span>
            <span className="text-SUIT_12 font-medium text-[#ACACAC] mx-[3px]">•</span>
            <span className="text-SUIT_12 font-medium text-[#ACACAC] mx-[3px]">
              {getDateDiff(questionDto.questionPost?.createdDate as string)}
            </span>
            <span className="text-SUIT_12 font-medium text-[#ACACAC] mx-[3px]">•</span>
            <span className="text-SUIT_12 font-medium text-[#ACACAC] ml-[3px]">
              조회수 {questionDto.questionPost?.viewCount}
            </span>
          </div>
          
          {/* 본문 텍스트 */}
          <div className="text-SUIT_16 font-medium mt-[16px] leading-[22.4px] text-black">
            {questionDto.questionPost?.content}
          </div>
        </div>

        {/* 첨부파일 */}
        {files && files.length > 0 && (
          <div className="mt-[12px] -mx-5 overflow-x-auto">
            <div className="flex gap-[12px] pb-[10px] pl-5">
              {files.map((file, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 h-[96px] w-[96px] bg-[#EDEDED] rounded-[8px] flex items-center justify-center overflow-hidden"
                >
                  <Image 
                    src={file} 
                    alt={`첨부 이미지 ${index + 1}`} 
                    width={96} 
                    height={96} 
                    className="object-cover h-full w-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/image/EasterEgg.svg"; // 이미지 로드 실패 시 기본 이미지
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 토픽 태그 (커스텀태그) */}
        {questionDto.customTags && questionDto.customTags.length > 0 && (
          <div className="mt-[16px] flex flex-wrap gap-[8px]">
            {questionDto.customTags.map((tag, index) => (
              <div 
                key={index} 
                className="h-[32px] px-[16px] py-[12px] rounded-[20px] bg-[#E2E2E2] flex items-center justify-center"
              >
                <span className="text-SUIT_14 font-medium leading-[19.6px] text-[#898989]">{tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* 지정태그 */}
        <div className="mt-[16px] flex flex-wrap gap-[8px]">
          {questionDto.questionPost?.questionPresetTags?.map((tag, index) => (
            <div
              key={index}
              className="h-[32px] px-[16px] py-[12px] rounded-[20px] bg-[#E2E2E2] flex items-center justify-center"
            >
              <span className="text-SUIT_14 font-medium leading-[19.6px] text-[#898989]">
                {getKoreanTag(tag)}
              </span>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div className="mt-[20px] h-[1px] w-full bg-[#D7D7D7]"></div>

        {/* 좋아요 및 댓글 액션 */}
        <div className="my-[10px] flex items-center gap-[12px]">
          <div
            onClick={!isLiked ? handleLikeClick : undefined} // 이미 눌렀다면 클릭 비활성화
            className="flex items-center gap-[4px] cursor-pointer"
          >
            <Image
              src={isLiked ? "/icons/newLikeThumbBlue.svg" : "/icons/newLikeThumbGray.svg"}
              alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
              width={16}
              height={16}
            />
            <span className={`text-SUIT_12 font-medium ${isLiked ? "text-[#03b89e]" : "text-[#ACACAC]"}`}>
              {currentLikeCount}
            </span>
          </div>

          {/* 질문 댓글 */}
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex items-center gap-[4px] cursor-pointer">
                <Image src="/icons/newChatBubbleGray.svg" alt="Comment_UnClicked" width={16} height={16} />
                <span className="text-SUIT_12 font-medium text-[#ACACAC]">{commentCount}</span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="px-[20px] pb-[20px]">
              <DrawerHeader className="px-0">
                <DrawerTitle className="text-SUIT_14 font-semibold flex text-[#3c3c3c]">
                  댓글 {commentCount}
                </DrawerTitle>
              </DrawerHeader>
              <div className="max-h-[400px] overflow-y-auto">
                <CommentSection
                  postId={questionDto.questionPost?.questionPostId as string}
                  contentType="QUESTION"
                  onCommentAdded={incrementCommentCount}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* 구분선 */}
        <div className="h-[1px] w-full bg-[#D7D7D7]"></div>
      </div>

      {/* 답변 섹션 */}
      <div className="mt-[20px] flex items-center">
        <Image src="/icons/answerBubbleGray.svg" alt="답변" width={16} height={16} className="text-[#C5C5C5]" />
        <span className="text-SUIT_14 font-semibold ml-[4px] text-[14px] text-black">
          답변 {questionDto.questionPost?.answerCount || 0}
        </span>
      </div>

      {/* 답변 영역 */}
      <AnswerSection postId={questionDto.questionPost?.questionPostId as string} isAuthor={isAuthor} />
    </div>
  );
}

export default QnaDetail;
