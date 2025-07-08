"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import subjects from "@/types/subjects";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useDispatch } from "react-redux";
import { addToast } from "@/global/store/toastSlice";
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPostFormData } from "@/components/questionPost/QuestionPostTypes";
import QuestionPostFirstPage from "@/components/questionPost/QuestionPostFirstPage";
import QuestionPostSecondPage from "@/components/questionPost/QuestionPostSecondPage";
import QnaPostRewardModal from "@/components/questionPost/QnaPostRewardModal";
import { QuestionCommand } from "@/types/api/requests/questionCommand";

export default function QnaPostPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<QuestionPostFormData>({
    title: "",
    content: "",
    subject: "",
    customTags: [],
    questionPresetTags: [],
    reward: 0,
    isPrivate: false,
    mediaFiles: [],
  });

  // 현재 페이지를 관리하는 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaAllowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  const showToast = (message: string) => {
    dispatch(
      addToast({
        id: Date.now().toString(),
        icon: <ToastIcon color="blue" />,
        title: message,
        color: "blue",
        action: (
          <ToastAction color="blue" altText="확인">
            확인
          </ToastAction>
        ),
      }),
    );
  };

  // 엽전 현상금 모달 토글 함수
  const toggleRewardModal = () => setIsRewardModalOpen(!isRewardModalOpen);

  // 첫 번째 페이지에서 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (formData.subject && formData.questionPresetTags.length > 0) {
      setCurrentPage(2);
    } else {
      showToast("교과목명을 입력해주세요.");
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  // subject(교과목명) 업데이트하는 함수
  const handleSubjectChange = (subject: string) => setFormData(prev => ({ ...prev, subject }));

  // isPrivate 업데이트하는 함수
  const handleIsPrivate = () => setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }));

  // reward 업데이트하는 함수
  const handleReward = (reward: number) => {
    setFormData(prev => ({ ...prev, reward }));
    setIsRewardModalOpen(false);
  };

  // 정적 태그 선택 함수
  const handleJiJeongTagSelect = (selectedTags: string[]) => {
    setFormData(prev => ({
      ...prev,
      questionPresetTags: selectedTags,
    }));
  };

  // 커스텀 태그 업데이트 함수
  const handleCustomTagsSubmit = (tags: string[]) => {
    setFormData(prev => ({
      ...prev,
      customTags: tags,
    }));
  };

  // 파일 업데이트 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const filteredFiles = filesArray.filter(file => mediaAllowedTypes.includes(file.type));

      if (filteredFiles.length !== filesArray.length) {
        showToast("JPEG,JPG,PNG,WEBP 형식의 파일만 업로드할 수 있습니다.");
        e.target.value = ""; // 선택한 파일 무효화(올바르지 않은 파일 형식일 경우)
      } else if (formData.mediaFiles.length + filteredFiles.length > 10) {
        // 최대 10개 파일 업로드 가능
        showToast("최대 10개의 파일만 업로드할 수 있습니다.");
        e.target.value = ""; // 선택한 파일 무효화
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          mediaFiles: [
            ...prevFormData.mediaFiles,
            ...filteredFiles.filter(file => !prevFormData.mediaFiles.some(f => f.name === file.name)), // 기존 파일 중복 방지
          ],
        }));
      }
    }
  };

  // 파일 삭제하는 함수
  const handleFileDelete = (fileName: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      mediaFiles: prevFormData.mediaFiles.filter(file => file.name !== fileName),
    }));
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = !!formData.title.trim() && !!formData.content.trim() && !!formData.subject;
    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      showToast("제목을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!formData.content.trim()) {
      showToast("질문을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!subjects.includes(formData.subject)) {
      showToast("정확한 교과목명을 입력하세요.");
      return;
    }

    if (isFormValid) {
      setIsUploading(true); // 업로딩 시작
      try {
        // 한글 태그를 API에서 사용하는 코드로 변환
        const tagMapping = Object.entries(QuestionPresetTag).reduce(
          (acc, [code, label]) => {
            acc[label] = code;
            return acc;
          },
          {} as Record<string, string>,
        );

        const command: Partial<QuestionCommand> = {
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          questionPresetTags: formData.questionPresetTags.map(tag => tagMapping[tag] as QuestionPresetTag),
          customTags: formData.customTags,
          rewardYeopjeon: formData.reward,
          isPrivate: formData.isPrivate,
          attachmentFiles: formData.mediaFiles,
        };

        // API 호출
        await questionPostApi.saveQuestionPost(command);

        showToast("Q&A 게시글이 성공적으로 등록되었습니다.");
        router.push("/board/question");
      } catch (error) {
        console.error("게시글 등록 오류:", error);
        showToast("게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsUploading(false); // 업로딩 종료
      }
    } else {
      showToast("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <CommonHeader
        title="질문 작성하기"
        rightType={RIGHT_ITEM.NONE}
        onLeftClick={currentPage === 2 ? () => setCurrentPage(1) : undefined}
      />
      <main className="flex flex-1 flex-col px-5 pt-4">
        <div className="flex flex-1 flex-col">
          {isUploading ? (
            <div className="flex h-[500px] items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              {/* 현재 페이지에 따른 컴포넌트 렌더링 */}
              {currentPage === 1 ? (
                <QuestionPostFirstPage
                  formData={formData}
                  onSubjectChange={handleSubjectChange}
                  onJiJeongTagsSelect={handleJiJeongTagSelect}
                  onCustomTagsSubmit={handleCustomTagsSubmit}
                  onNextPage={goToNextPage}
                />
              ) : (
                <QuestionPostSecondPage
                  formData={formData}
                  onFormChange={handleChange}
                  onFileChange={handleFileChange}
                  onFileDelete={handleFileDelete}
                  onPrivateToggle={handleIsPrivate}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          )}

          {/* 엽전 보상 모달 */}
          {isRewardModalOpen && (
            <QnaPostRewardModal
              isVisible={isRewardModalOpen}
              reward={formData.reward}
              onClose={toggleRewardModal}
              onSelectReward={handleReward}
            />
          )}
        </div>
      </main>
    </div>
  );
}
