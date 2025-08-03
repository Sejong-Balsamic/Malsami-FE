/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import { ContentType } from "@/types/api/constants/contentType";
import AnswerSection from "./AnswerSection";
import { formatDateTime } from "@/global/time";
import { useMemo } from "react";
import CommentSection from "./QCommentSection";
import { isSameMemberById } from "@/global/memberUtil";
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

function QuestionDetail({ questionDto }: { questionDto: QuestionDto }) {
  const [isLiked, setIsLiked] = useState(questionDto.questionPost?.isLiked); // API 응답 값으로 초기화
  const [currentLikeCount, setCurrentLikeCount] = useState(questionDto.questionPost?.likeCount as number);

  const isAuthor: boolean =
    questionDto.questionPost?.isAuthor ?? isSameMemberById(questionDto.questionPost?.member?.memberId as string);
  // HOT 여부 : isPopular 사용
  const isHot = questionDto.questionPost?.isPopular === true;

  // 작성일 포맷 (MM/DD HH:mm) util 사용
  const formattedDate = useMemo(
    () => formatDateTime(questionDto.questionPost?.createdDate ?? ""),
    [questionDto.questionPost?.createdDate],
  );

  const handleLikeClick = async () => {
    if (isLiked) return; // 이미 좋아요를 누른 상태라면 실행하지 않음
    if (isSameMemberById(questionDto.questionPost?.member?.memberId as string)) return; // 작성자가 좋아요를 누르지 못하도록 차단

    try {
      setIsLiked(true); // 즉시 반영: 버튼 비활성화 및 색상 변경
      setCurrentLikeCount(currentLikeCount + 1); // 즉시 반영: 좋아요 숫자 증가

      await postLikeQuestion(questionDto.questionPost?.questionPostId as string, ContentType.QUESTION);
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
      <div className="mt-4 flex flex-wrap items-center gap-[4px]">
        {isHot && <HotTag />}

        {/* 과목/채택 */}
        {questionDto.questionPost?.chaetaekStatus && (
          <div className="inline-flex h-[32px] items-center justify-center rounded bg-[#3D8BFF] px-[6px] py-[4px]">
            <span className="text-SUIT_12 font-bold text-white">채택됨</span>
          </div>
        )}

        {/* 과목명 태그 */}
        <SubjectTag subjectName={questionDto.questionPost?.subject} type="question" />

        {/* 엽전 태그 */}
        <RewardTag amount={questionDto.questionPost?.rewardYeopjeon as number} />
      </div>

      {/* 글 정보 */}
      <div className="flex w-full flex-col">
        <div className="mt-3">
          <h1 className="text-SUIT_18 font-semibold leading-[18px] text-black">{questionDto.questionPost?.title}</h1>

          {/* 전공 · 조회수 · 작성일 */}
          <div className="mt-2 flex items-center gap-[4px] text-SUIT_12 font-medium text-ui-muted">
            {/* 작성자 전공 */}
            <span>{questionDto.questionPost?.member?.major ?? "전공 비공개"}</span>
            {/* 구분 점 */}
            <span className="text-ui-muted">•</span>
            {/* 조회수 아이콘 + 숫자 */}
            <span className="inline-flex items-center gap-1">
              <Image src="/viewCountGray.svg" alt="views" width={12} height={12} />
              <span className="text-ui-count">{questionDto.questionPost?.viewCount}</span>
            </span>
            <span className="text-ui-muted">•</span>
            {/* 날짜 */}
            <span className="text-ui-muted">{formattedDate}</span>
          </div>

          {/* 본문 텍스트 */}
          <div className="mt-[16px] text-SUIT_16 font-medium leading-[22.4px] text-black">
            {questionDto.questionPost?.content}
          </div>
        </div>

        {/* 이미지 및 동영상 */}
        {files && files.length > 0 && (
          <div className="mt-2 overflow-x-auto">
            <div className="flex gap-[12px] pb-[10px]">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#EDEDED]"
                >
                  <Image
                    src={file}
                    alt={`첨부 이미지 ${index + 1}`}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/image/imagePlaceHolder.png"; // 이미지 로드 실패 시 기본 이미지
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 지정태그 */}
        <div className="mt-3 flex flex-wrap gap-[8px]">
          {questionDto.questionPost?.questionPresetTags?.map((tag, index) => (
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

        {/* 커스텀태그 */}
        {questionDto.customTags && questionDto.customTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-[8px]">
            {questionDto.customTags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-[10px] rounded-[34px] bg-tag-custom-bg px-[14px] py-[8px]"
              >
                <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-custom-text">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 얇은 구분선 */}
        <div className="mt-5 h-[1px] w-full bg-[#D7D7D7]"></div>

        {/* 좋아요 및 댓글 액션 */}
        <div className="mb-[15px] mt-[15px] flex justify-center">
          <div className="flex w-full max-w-[433px] divide-x divide-transparent">
            {/* 왼쪽(좋아요) */}
            <div className="flex w-1/2 justify-center">
              <div
                onClick={!isLiked ? handleLikeClick : undefined}
                className="flex cursor-pointer items-center gap-[4px]"
              >
                <Image
                  src={isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                  alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                  width={16}
                  height={16}
                />
                <span className={`text-SUIT_12 font-medium ${isLiked ? "text-[#03b89e]" : "text-[#ACACAC]"}`}>
                  {currentLikeCount}
                </span>
              </div>
            </div>

            {/* 오른쪽(댓글) */}
            <div className="flex w-1/2 justify-center">
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-[4px]">
                    <Image src="/icons/newChatBubbleGray.svg" alt="Comment_UnClicked" width={16} height={16} />
                    <span className="text-SUIT_12 font-medium text-[#ACACAC]">{commentCount}</span>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="px-[20px] pb-[20px]">
                  <DrawerHeader className="px-0">
                    <DrawerTitle className="flex text-SUIT_14 font-semibold text-[#3c3c3c]">
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
          </div>
        </div>

        {/* 두꺼운 구분선 (전체 가로폭) */}
        <div className="-mx-5 h-[4px] w-[calc(100%+40px)] rounded-[2px] bg-[#EDEDED]"></div>
      </div>

      {/* 답변 섹션 */}
      <div className="mt-4 flex items-center gap-[8px]">
        <Image src="/icons/answerBubbleGray.svg" alt="답변" width={16} height={16} />
        <span className="text-SUIT_14 font-semibold text-[#898989]">
          답변 {questionDto.questionPost?.answerCount || 0}
        </span>
      </div>

      {/* 답변 영역 */}
      <div className="mt-5">
        <AnswerSection postId={questionDto.questionPost?.questionPostId as string} isAuthor={isAuthor} />
      </div>
    </div>
  );
}

export default QuestionDetail;
