"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import AnswerPageNav from "@/components/nav/AnswerPageNav";
import ContentInput from "@/components/board/question/post/formInput/ContentInput";
import FileUploadInput from "@/components/board/question/post/formInput/FileUploadInput";
import PrivateSettingInput from "@/components/board/question/post/formInput/PrivateSettingInput";
import postAnswer from "@/apis/question/postAnswer";
import OriginalQuestion from "@/components/board/question/answer/OriginalQuestion";

interface AnswerPostFormData {
  content: string;
  isPrivate: boolean;
  mediaFiles: File[];
}

export default function AnswerPostPage() {
  const params = useParams(); // URL에서 파라미터 추출
  const questionPostId = Array.isArray(params.id) ? params.id[0] : params.id; // id를 추출

  const [formData, setFormData] = useState<AnswerPostFormData>({
    content: "",
    isPrivate: false,
    mediaFiles: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const mediaAllowedTypes = ["image/jpeg", "image/png"];

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const filteredFiles = filesArray.filter(file => mediaAllowedTypes.includes(file.type));

      if (filteredFiles.length !== filesArray.length) {
        alert("JPEG 또는 PNG 형식의 파일만 업로드할 수 있습니다.");
        e.target.value = ""; // 선택한 파일 무효화
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          mediaFiles: [
            ...prevFormData.mediaFiles,
            ...filteredFiles.filter(file => !prevFormData.mediaFiles.some(f => f.name === file.name)), // 중복 방지
          ],
        }));
      }
    }
  };

  // 파일 삭제 핸들러
  const handleFileDelete = (fileName: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      mediaFiles: prevFormData.mediaFiles.filter(file => file.name !== fileName),
    }));
  };

  // 유효성 검사
  const checkFormValidity = () => {
    return !!formData.content.trim();
  };

  // 폼 데이터 변경 시 유효성 검사 실행
  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [formData]);

  // 제출 핸들러
  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      alert("질문을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }

    if (isFormValid) {
      try {
        await postAnswer({
          content: formData.content,
          questionPostId,
          isPrivate: formData.isPrivate,
          mediaFiles: formData.mediaFiles,
        }); // API 호출
        alert("답변이 성공적으로 등록되었습니다.");
        localStorage.removeItem("answerFormData"); // 로컬 스토리지의 임시저장 데이터 삭제
        window.location.href = `/board/question/detail/${questionPostId}`; // 작성 완료 후 해당 질문 상세 페이지로 이동
      } catch (error) {
        console.log("error", error);
        alert("답변 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTopOnLoad />
      <AnswerPageNav />
      <div className="w-full min-w-[386px] max-w-[640px] bg-white p-5">
        <div>
          <div>
            {/* 원문 */}
            <OriginalQuestion />
          </div>
          <form>
            {/* 질문 */}
            <ContentInput value={formData.content} onChange={handleChange} />
            {/* 파일 업로드 */}
            <FileUploadInput
              mediaFiles={formData.mediaFiles}
              onFileChange={handleFileChange}
              onFileDelete={handleFileDelete}
            />
            {/* 추가 설정 */}
            <PrivateSettingInput
              isPrivate={formData.isPrivate}
              onToggle={() => setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }))}
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full rounded-md p-2 text-white ${isFormValid ? "bg-custom-blue-500" : "bg-[#E2E2E2]"}`}
            >
              답변 등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
