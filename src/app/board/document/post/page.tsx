"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import subjects from "@/types/subjects";
import { DOCUMENT_MEDIA_ALLOWED_TYPES } from "@/types/documentMediaAllowedTypes";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { documentPostApi } from "@/apis/documentPostApi";
import useCommonToast from "@/global/hook/useCommonToast";
import DocumentPostFirstPage from "@/components/documentPost/DocumentPostFirstPage";
import DocumentPostSecondPage from "@/components/documentPost/DocumentPostSecondPage";
import { DocumentPostFormData } from "@/components/documentPost/DocumentPostTypes";

export default function DocumentPostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<DocumentPostFormData>({
    title: "",
    content: "",
    subject: "",
    customTags: [],
    documentTypes: [],
    attendedYear: 2025,
    isDepartmentPrivate: false,
    mediaFiles: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUploading, setIsUploading] = useState(false);

  const { showConfirmToast, showWarningToast } = useCommonToast();

  // 모든 필수 입력 필드가 채워져 있는지 확인
  const checkFormValidity = useCallback(() => {
    const { title, content, subject, documentTypes } = formData;
    return !!title && !!content && !!subject && documentTypes.length > 0;
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
  const handleSubjectChange = (subject: string) => setFormData(prev => ({ ...prev, subject }));

  const handleCustomTagsSubmit = (tags: string[]) => setFormData(prev => ({ ...prev, customTags: tags }));

  // isPrivate 업데이트하는 함수
  const handleIsDepartmentPrivate = () =>
    setFormData(prev => ({ ...prev, isDepartmentPrivate: !prev.isDepartmentPrivate }));

  // 파일 업데이트 함수 (파일 형식, 크기, 개수 조건 검사)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // 일부 브라우저가 MIME 타입을 제공하지 않는 경우(예: .hwp, .hwpx) 확장자 기반으로 허용 여부를 추가 확인합니다.
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
        const isValidType = DOCUMENT_MEDIA_ALLOWED_TYPES.includes(file.type) || isExtensionAllowed(file.name); // 허용된 형식 또는 확장자
        const isValidSize = isFileSizeValid(file); // 파일 크기 검사
        if (!isValidType) {
          showWarningToast(`"${file.name}"는 지원하지 않는 파일 형식입니다.`);
        } else if (!isValidSize) {
          const maxSize = file.type.startsWith("video/") ? "200MB" : "30MB";
          showWarningToast(`"${file.name}" 파일은 최대 ${maxSize}를 초과할 수 없습니다.`);
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
        showWarningToast("전체 파일 크기는 1KB를 초과할 수 없습니다.");
        e.target.value = ""; // 파일 무효화
        return;
      }

      // 총 파일 개수 검사
      if (formData.mediaFiles.length + filteredFiles.length > 10) {
        showWarningToast("최대 10개의 파일만 업로드할 수 있습니다.");
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
      showWarningToast("제목을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!formData.content.trim()) {
      showWarningToast("질문을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!subjects.includes(formData.subject)) {
      showWarningToast("정확한 교과목명을 입력하세요.");
      return;
    }

    if (isFormValid) {
      setIsUploading(true); // 업로딩 시작
      try {
        await documentPostApi.saveDocumentPost({
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          customTags: formData.customTags,
          attachmentFiles: formData.mediaFiles.length > 0 ? formData.mediaFiles : undefined,
          attendedYear: formData.attendedYear,
          documentTypes: formData.documentTypes as any,
          isDepartmentPrivate: formData.isDepartmentPrivate,
        });
        showConfirmToast("자료 게시글이 성공적으로 등록되었습니다.");
        router.push("/board/document");
      } catch (error) {
        showWarningToast("게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsUploading(false); // 업로딩 종료
      }
    } else {
      showWarningToast("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <CommonHeader
        title="자료 작성하기"
        rightType={RIGHT_ITEM.NONE}
        onLeftClick={currentPage === 2 ? () => setCurrentPage(1) : undefined}
      />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col px-5 pt-4">
          <div className="flex flex-1 flex-col">
            {isUploading ? (
              <div className="flex h-[500px] items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
                {currentPage === 1 ? (
                  <DocumentPostFirstPage
                    formData={formData}
                    onSubjectChange={handleSubjectChange}
                    onAttendedYearChange={year => setFormData(prev => ({ ...prev, attendedYear: year }))}
                    onDocumentTypesChange={selectedTags =>
                      setFormData(prev => ({ ...prev, documentTypes: selectedTags }))
                    }
                    onCustomTagsChange={handleCustomTagsSubmit}
                    onNextPage={() => setCurrentPage(2)}
                  />
                ) : (
                  <DocumentPostSecondPage
                    formData={formData}
                    onFormChange={handleChange}
                    onFileChange={handleFileChange}
                    onFileDelete={handleFileDelete}
                    onDepartmentPrivateToggle={handleIsDepartmentPrivate}
                    onSubmit={handleSubmit}
                    isFormValid={isFormValid}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
