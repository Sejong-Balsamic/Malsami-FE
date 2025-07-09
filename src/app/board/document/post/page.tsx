"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import subjects from "@/types/subjects";
import { docMediaAllowedTypes } from "@/types/docMediaAllowedTypes";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import postNewDoc from "@/apis/document/postNewDoc";
import { useDispatch } from "react-redux";
import { addToast } from "@/global/store/toastSlice"; // Toast 액션 가져오기
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import TitleInput from "@/components/questionPost/TitleInput";
import ContentInput from "@/components/documentPost/ContentInput";
import FileUploadInput from "@/components/documentPost/FileUploadInput";
import SubjectSearchInputComponent from "@/components/questionPost/SubjectSearchInputComponent";
import CategoryInput from "@/components/documentPost/CategoryInput";
import StudyYearInput from "@/components/documentPost/studyYearInput";
import CustomTagsInput from "@/components/documentPost/CustomTagsInput";
import PrivateSettingInput from "@/components/questionPost/PrivateSettingInput";
import QnaPostSubjectModal from "@/deprecated/questionPost/QnaPostSubjectModal";
import QnaPostCustomTagsModal from "@/deprecated/questionPost/QnaPostCustomTagsModal";
import DocPostStudyYearModal from "@/components/documentPost/DocPostStudyYearModal";
import DocPostCategoryTagsModal from "@/components/documentPost/DocPostCategoryTagsModal";

interface DocPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags: string[];
  categoryTags: string[];
  studyYear: number;
  isPrivate: boolean;
  mediaFiles: File[]; // File 배열로 정의
}

export default function QnaPostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<DocPostFormData>({
    title: "",
    content: "",
    subject: "",
    customTags: [],
    categoryTags: [],
    studyYear: 2024,
    isPrivate: false,
    mediaFiles: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isCategoryTagsModalOpen, setIsCategoryTagsModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isStudyYearModalOpen, setIsStudyYearModalOpen] = useState(false);
  const [isCustomTagsModalOpen, setIsCustomTagsModalOpen] = useState(false);
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

  // 태그 삭제 함수
  const removeTag = (tag: string): void => {
    setFormData(prev => ({
      ...prev,
      customTags: prev.customTags.filter(t => t !== tag),
    }));
  };

  const toggleCategoryTagsModal = () => setIsCategoryTagsModalOpen(!isCategoryTagsModalOpen);
  const toggleSubjectModal = () => setIsSubjectModalOpen(!isSubjectModalOpen);
  const toggleCustomTagsModal = () => setIsCustomTagsModalOpen(!isCustomTagsModalOpen);
  const toggleStudyYearModal = () => setIsStudyYearModalOpen(!isStudyYearModalOpen);

  // 모든 필수 입력 필드가 채워져 있는지 확인
  const checkFormValidity = useCallback(() => {
    const { title, content, subject, categoryTags } = formData;
    return !!title && !!content && !!subject && categoryTags.length > 0;
  }, [formData]);

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
  }, [formData, checkFormValidity]);

  // subject(교과목명) 업데이트하는 함수
  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({ ...prev, subject }));
  };

  // isPrivate 업데이트하는 함수
  const handleIsPrivate = () => {
    setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  // 카테고리 선택 업데이트 함수
  const handleCategoryTagsSelect = (selectedTags: string[]) => {
    setFormData(prev => ({
      ...prev,
      categoryTags: selectedTags,
    }));
  };

  // 커스텀 태그 업데이트 함수
  const handleCustomTagsSubmit = (tags: string[]) => {
    setFormData(prev => ({
      ...prev,
      customTags: tags,
    }));
  };

  // 선택된 수강년도 처리 함수
  const handleYearSubmit = (studyYear: number) => {
    setFormData(prev => ({ ...prev, studyYear }));
  };

  // 파일 업데이트 함수 (파일 형식, 크기, 개수 조건 검사)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // 확장자 Hwp 확인. 임시로 수정. 나중에 docMediaAllowedTypes에 추가하여야 함.
      const allowedExtensions = [".hwp", ".hwpx"];
      const isExtensionAllowed = (fileName: string) => {
        const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
        return allowedExtensions.includes(extension);
      };

      // 파일 크기 제한 검사
      const isFileSizeValid = (file: File) => {
        if (file.type.startsWith("video/")) {
          return file.size <= 200 * 1024 * 1024; // 비디오 파일 200MB 이하
        }
        return file.size <= 30 * 1024 * 1024; // 다른 파일 30MB 이하
      };
      // 파일 크기 및 형식 검사
      const filteredFiles = filesArray.filter(file => {
        const isValidType = docMediaAllowedTypes.includes(file.type) || isExtensionAllowed(file.name); // 허용된 형식 또는 확장자
        const isValidSize = isFileSizeValid(file); // 파일 크기 검사
        if (!isValidType) {
          showToast(`"${file.name}"는 지원하지 않는 파일 형식입니다.`);
        } else if (!isValidSize) {
          const maxSize = file.type.startsWith("video/") ? "200MB" : "30MB";
          showToast(`"${file.name}" 파일은 최대 ${maxSize}를 초과할 수 없습니다.`);
        }
        return isValidType && isValidSize;
      });
      if (filteredFiles.length !== filesArray.length) {
        e.target.value = ""; // 유효하지 않은 파일 무효화
      }

      // 새로 추가된 파일 크기 총합 계산
      const newFilesTotalSize = filteredFiles.reduce((acc, file) => acc + file.size, 0);
      // 기존 업로드된 파일 크기 총합 계산
      const existingFilesTotalSize = formData.mediaFiles.reduce((acc, file) => acc + file.size, 0);
      // 전체 파일 크기 제한 검사
      if (existingFilesTotalSize + newFilesTotalSize > 1024 * 1024 * 1000) {
        showToast("전체 파일 크기는 1KB를 초과할 수 없습니다.");
        e.target.value = ""; // 파일 무효화
        return;
      }

      // 총 파일 개수 검사
      if (formData.mediaFiles.length + filteredFiles.length > 10) {
        showToast("최대 10개의 파일만 업로드할 수 있습니다.");
        e.target.value = ""; // 파일 무효화
        return;
      }
      // 유효한 파일 추가
      setFormData(prevFormData => ({
        ...prevFormData,
        mediaFiles: [
          ...prevFormData.mediaFiles,
          ...filteredFiles.filter(file => !prevFormData.mediaFiles.some(f => f.name === file.name)), // 중복 방지
        ],
      }));
    }
  };

  // 파일 삭제하는 함수
  const handleFileDelete = (fileName: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      mediaFiles: prevFormData.mediaFiles.filter(file => file.name !== fileName),
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 제목에 공백만 입력된 경우 확인
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
        await postNewDoc(formData); // API 호출
        localStorage.removeItem("docPostFormData"); // 로컬 스토리지의 임시저장 데이터 삭제
        showToast("자료 게시글이 성공적으로 등록되었습니다.");
        router.push("/board/document");
      } catch (error) {
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
      <CommonHeader title="자료 작성하기" rightType={RIGHT_ITEM.NONE} />
      <div>
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
                {/* 설명 */}
                <ContentInput value={formData.content} onChange={handleChange} />
                {/* 파일 업로드 */}
                <FileUploadInput
                  mediaFiles={formData.mediaFiles}
                  onFileChange={handleFileChange}
                  onFileDelete={handleFileDelete}
                />
                {/* 교과목명 검색 */}
                <SubjectSearchInputComponent value={formData.subject} onClick={toggleSubjectModal} />
                {/* 카테고리 선택 */}
                <CategoryInput tags={formData.categoryTags} onOpenModal={toggleCategoryTagsModal} />
                {/* 수강년도 선택 */}
                <StudyYearInput year={formData.studyYear} onOpenModal={toggleStudyYearModal} />
                {/* 커스텀 태그 */}
                <CustomTagsInput tags={formData.customTags} onClick={toggleCustomTagsModal} onRemoveTag={removeTag} />
                {/* 추가 설정 */}
                <PrivateSettingInput isPrivate={formData.isPrivate} onToggle={handleIsPrivate} />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`w-full rounded-[10px] p-2 text-white ${isFormValid ? "bg-custom-blue-500" : "bg-[#E2E2E2]"}`}
                >
                  작성완료
                </button>
              </form>
            )}
            {/* 모달들 */}
            {/* 교과목명 검색 모달 */}
            {isSubjectModalOpen && (
              <QnaPostSubjectModal
                isVisible={isSubjectModalOpen}
                subject={formData.subject}
                onClose={toggleSubjectModal}
                onSelectSubject={handleSubjectChange}
              />
            )}
            {/* 카테고리 선택 모달 */}
            {isCategoryTagsModalOpen && (
              <DocPostCategoryTagsModal
                isVisible={isCategoryTagsModalOpen}
                onClose={toggleCategoryTagsModal}
                selectedTags={formData.categoryTags}
                onSubmitTags={handleCategoryTagsSelect}
              />
            )}
            {/* 커스텀 태그 선택 모달 */}
            {isCustomTagsModalOpen && (
              <QnaPostCustomTagsModal
                isVisible={isCustomTagsModalOpen}
                onClose={toggleCustomTagsModal}
                initialTags={formData.customTags}
                onTagsSubmit={handleCustomTagsSubmit}
              />
            )}
            {/* 수강년도 선택 모달 */}
            {isStudyYearModalOpen && (
              <DocPostStudyYearModal
                isVisible={isStudyYearModalOpen}
                onClose={toggleStudyYearModal}
                studyYear={formData.studyYear}
                onSubmitStudyYear={handleYearSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
