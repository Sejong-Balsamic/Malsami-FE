"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import postAnswer from "@/apis/question/postAnswer";
import { useDispatch } from "react-redux";
import { addToast } from "@/global/store/toastSlice"; // Toast 액션 가져오기
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import FileUploadInput from "@/components/questionPost/FileUploadInput";
import OriginalQuestion from "@/components/questionAnswer/OriginalQuestion";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import CommonTextarea from "@/components/common/CommonTextarea";

interface AnswerPostFormData {
  content: string;
  isPrivate: boolean;
  mediaFiles: File[];
}

export default function AnswerPostPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const params = useParams(); // URL에서 파라미터 추출
  const questionPostId = Array.isArray(params.id) ? params.id[0] : params.id; // id를 추출
  const [isSubmitting, setisSubmitting] = useState(false); // 업로드 상태

  const [formData, setFormData] = useState<AnswerPostFormData>({
    content: "",
    isPrivate: false,
    mediaFiles: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const mediaAllowedTypes = ["image/jpeg", "image/png"];

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
        showToast("JPEG 또는 PNG 형식의 파일만 업로드할 수 있습니다.");
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
    if (isSubmitting) return;

    if (!formData.content.trim()) {
      showToast("질문을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    setisSubmitting(true);

    if (isFormValid) {
      try {
        await postAnswer({
          content: formData.content,
          questionPostId,
          isPrivate: formData.isPrivate,
          mediaFiles: formData.mediaFiles,
        }); // API 호출
        showToast("답변이 성공적으로 등록되었습니다.");
        localStorage.removeItem("answerFormData"); // 로컬 스토리지의 임시저장 데이터 삭제
        router.push(`/board/question/detail/${questionPostId}`); // 작성 완료 후 해당 질문 상세 페이지로 이동
      } catch (error) {
        // AxiosError 확인
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.errorMessage || "오류가 발생했습니다.";
          showToast(errorMessage);
        } else {
          // 예상치 못한 오류 처리
          showToast("답변 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } finally {
        setisSubmitting(false);
      }
    } else {
      showToast("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTopOnLoad />

      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <CommonHeader title="답변 작성" rightType={RIGHT_ITEM.NONE} />
      </div>

      {/* 헤더 높이만큼 스페이서 */}
      <div className="h-16 w-full" />

      {/* Main Content */}
      <main className="px-5">
        {/* 원문 보기 */}
        <OriginalQuestion questionPostId={questionPostId} isInAnswerPage />

        {/* 로딩 중일 때 */}
        {isSubmitting ? (
          <div className="flex h-[500px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <form>
            {/* 답변 섹션 */}
            <div className="mt-4">
              <h2 className="text-SUIT_16 font-medium text-black">답변</h2>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-SUIT_14 font-medium text-[#898989]">최대 2000자까지 작성할 수 있어요.</span>

                {/* 익명 설정 */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isPrivate: !prev.isPrivate }))}
                    className="mr-1"
                  >
                    <img
                      src={
                        formData.isPrivate
                          ? "/icons/chaetaekCheckboxChecked.svg"
                          : "/icons/chaetaekCheckboxUnchecked.svg"
                      }
                      alt="익명 체크박스"
                      width={16}
                      height={16}
                    />
                  </button>
                  <span
                    className="font-suit-medium text-[14px]"
                    style={{ color: formData.isPrivate ? "#00E271" : "#9B9B9B" }}
                  >
                    익명
                  </span>
                </div>
              </div>

              {/* 답변 입력란 */}
              <div className="relative mt-3">
                <CommonTextarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="답변을 작성해주세요."
                  maxLength={2000}
                  required
                  contentType="question"
                  className="min-h-[226px]"
                />

                {/* 글자 수 카운터 */}
                <div
                  className="absolute text-right"
                  style={{ bottom: "16px", right: "16px", fontSize: "12px", lineHeight: "100%" }}
                >
                  <span style={{ color: "#00E271", fontWeight: 600 }}>{formData.content.length}</span>
                  <span style={{ color: "#C5C5C5", fontWeight: 500 }}> / 2000</span>
                </div>
              </div>
            </div>

            {/* 이미지 섹션 */}
            <div className="mt-7">
              <h2 className="text-SUIT_16 font-medium text-black">이미지</h2>

              <div className="mt-2">
                <span
                  className="text-SUIT_14 font-medium"
                  style={{
                    color: "#898989",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "100%",
                  }}
                >
                  최대 50MB까지 업로드할 수 있어요.
                </span>
              </div>

              {/* 이미지 업로드 영역 */}
              <div className="mt-3">
                <FileUploadInput
                  mediaFiles={formData.mediaFiles}
                  onFileChange={handleFileChange}
                  onFileDelete={handleFileDelete}
                />
              </div>
            </div>

            {/* 완료 버튼 */}
            <div className="mb-6 mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`h-14 w-full rounded-[8px] text-SUIT_18 font-extrabold text-white disabled:cursor-not-allowed ${
                  isFormValid ? "bg-[#00E271]" : "bg-ui-border"
                }`}
              >
                완료
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
