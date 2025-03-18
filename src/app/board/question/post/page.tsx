"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import subjects from "@/types/subjects";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import postNewQna from "@/apis/question/postNewQna";
import { useDispatch } from "react-redux";
import { addToast } from "@/global/store/toastSlice"; // Toast 액션 가져오기
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import TitleInput from "@/components/questionPost/TitleInput";
import ContentInput from "@/components/questionPost/ContentInput";
import FileUploadInput from "@/components/questionPost/FileUploadInput";
import SubjectSearchInputComponent from "@/components/questionPost/SubjectSearchInputComponent";
import JiJeongTagInput from "@/components/questionPost/JijeongTagInput";
import YeopjeonRewardInput from "@/components/questionPost/YeopjeonRewardInput";
import CustomTagsInput from "@/components/questionPost/CustomTagsInput";
import PrivateSettingInput from "@/components/questionPost/PrivateSettingInput";
import QnaPostSubjectModal from "@/components/questionPost/QnaPostSubjectModal";
import QnaPostRewardModal from "@/components/questionPost/QnaPostRewardModal";
import QnaPostJiJeongTagModal from "@/components/questionPost/QnaPostJiJeongTagModal";
import QnaPostCustomTagsModal from "@/components/questionPost/QnaPostCustomTagsModal";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import questionApi from "@/apis/questionApi";
import { QuestionPresetTag, questionPresetTagLabels } from "@/types/api/constants/questionPresetTag";

interface QnaPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags: string[];
  questionPresetTags: string[];
  reward: number;
  isPrivate: boolean;
  mediaFiles: File[]; // File 배열로 정의
}

export default function QnaPostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<QnaPostFormData>({
    title: "",
    content: "",
    subject: "",
    customTags: [],
    questionPresetTags: [],
    reward: 0,
    isPrivate: false,
    mediaFiles: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isJiJeongTagModalOpen, setIsJiJeongTagModalOpen] = useState(false);
  const [isCustomTagsModalOpen, setIsCustomTagsModalOpen] = useState(false);
  const mediaAllowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const [isUploading, setIsUploading] = useState(false); // 업로드 상태
  const dispatch = useDispatch();

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

  // // 로컬 스토리지에 저장하는 함수
  // const saveToLocalStorage = () => {
  //   localStorage.setItem("qnaPostFormData", JSON.stringify(formData));
  //   showToast("임시저장 되었습니다!");
  // };
  // // 로컬 스토리지에서 데이터를 불러오는 함수
  // const loadFromLocalStorage = () => {
  //   const savedData = localStorage.getItem("qnaPostFormData");
  //   if (savedData) {
  //     setFormData(JSON.parse(savedData));
  //     showToast("임시저장 데이터를 불러왔습니다.");
  //   }
  // };
  // // 컴포넌트가 로드될 때 로컬 스토리지 데이터를 불러오기
  // useEffect(() => {
  //   loadFromLocalStorage();
  // }, []);

  // 태그 삭제 함수
  const removeTag = (tag: string): void => {
    setFormData(prev => ({
      ...prev,
      customTags: prev.customTags.filter(t => t !== tag),
    }));
  };

  const toggleRewardModal = () => setIsRewardModalOpen(!isRewardModalOpen);
  const toggleJiJeongTagModal = () => setIsJiJeongTagModalOpen(!isJiJeongTagModalOpen);
  const toggleSubjectModal = () => setIsSubjectModalOpen(!isSubjectModalOpen);
  const toggleCustomTagsModal = () => setIsCustomTagsModalOpen(!isCustomTagsModalOpen);

  // 모든 필수 입력 필드가 채워져 있는지 확인
  const checkFormValidity = () => {
    const { title, content, subject } = formData;
    return !!title && !!content && !!subject;
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  // formData가 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [formData]);

  // subject(교과목명) 업데이트하는 함수
  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({ ...prev, subject }));
  };

  // isPrivate 업데이트하는 함수
  const handleIsPrivate = () => {
    setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  // reward 업데이트하는 함수
  const handleReward = (reward: number) => {
    setFormData(prev => ({ ...prev, reward }));
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

  const handleSubmit = async () => {
    // 유효성 검사 (기존 코드 유지)
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
        const tagMapping = Object.entries(questionPresetTagLabels).reduce((acc, [code, label]) => {
          acc[label] = code;
          return acc;
        }, {} as Record<string, string>);

        // questionApi 호출
        await questionApi.saveQuestionPost({
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          questionPresetTags: formData.questionPresetTags.map(tag => tagMapping[tag] as QuestionPresetTag),
          customTags: formData.customTags,
          rewardYeopjeon: formData.reward,
          isPrivate: formData.isPrivate,
          attachmentFiles: formData.mediaFiles // 파일 첨부
        });

        localStorage.removeItem("qnaPostFormData"); // 로컬 스토리지의 임시저장 데이터 삭제
        showToast("Q&A 게시글이 성공적으로 등록되었습니다.");
        router.push("/board/question");
      } catch (error) {
        console.log("error", error);
        showToast("게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsUploading(false); // 업로딩 종료
      }
    } else {
      showToast("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <CommonHeader title="질문 작성" rightType={RIGHT_ITEM.NONE} />
      {/* 헤더 여백 추가 */}
      <div className="mt-[64px]">
        <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white p-5">
          <div className="rounded-lg">
            {/* 로딩 중일 때 */}
            {isUploading ? (
              <div className="flex h-[500px] items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              //  업로딩 중이 아닐 때 폼 내용 표시
              <form>
                {/* 제목 */}
                <TitleInput value={formData.title} onChange={handleChange} />
                {/* 질문 */}
                <ContentInput value={formData.content} onChange={handleChange} />
                {/* 파일 업로드 */}
                <FileUploadInput
                  mediaFiles={formData.mediaFiles}
                  onFileChange={handleFileChange}
                  onFileDelete={handleFileDelete}
                />
                {/* 교과목명 검색 */}
                <SubjectSearchInputComponent value={formData.subject} onClick={toggleSubjectModal} />
                {/* 정적 태그 */}
                <JiJeongTagInput tags={formData.questionPresetTags} onOpenModal={toggleJiJeongTagModal} />
                {/* 엽전 현상금 */}
                <YeopjeonRewardInput reward={formData.reward} onClick={toggleRewardModal} />
                {/* 커스텀 태그 */}
                <CustomTagsInput tags={formData.customTags} onClick={toggleCustomTagsModal} onRemoveTag={removeTag} />
                {/* 추가 설정 */}
                <PrivateSettingInput isPrivate={formData.isPrivate} onToggle={handleIsPrivate} />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`font-pretendard-semibold w-full rounded-[10px] p-2 text-base text-white ${isFormValid ? "bg-custom-blue-500" : "bg-[#E2E2E2]"}`}
                >
                  작성완료
                </button>
              </form>
            )}

            {/* 모달들 */}
            {isSubjectModalOpen && (
              <QnaPostSubjectModal
                isVisible={isSubjectModalOpen}
                subject={formData.subject}
                onClose={toggleSubjectModal}
                onSelectSubject={handleSubjectChange} // subject을 변경할 함수 전달
              />
            )}
            {isRewardModalOpen && (
              <QnaPostRewardModal
                isVisible={isRewardModalOpen}
                reward={formData.reward}
                onClose={toggleRewardModal}
                onSelectReward={handleReward} // reward 값을 변경할 함수 전달
              />
            )}
            {isJiJeongTagModalOpen && (
              <QnaPostJiJeongTagModal
                isVisible={isJiJeongTagModalOpen}
                onClose={toggleJiJeongTagModal}
                selectedTags={formData.questionPresetTags}
                onSubmitTags={handleJiJeongTagSelect}
              />
            )}
            {isCustomTagsModalOpen && (
              <QnaPostCustomTagsModal
                isVisible={isCustomTagsModalOpen}
                onClose={toggleCustomTagsModal}
                initialTags={formData.customTags}
                onTagsSubmit={handleCustomTagsSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
