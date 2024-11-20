"use client";

// 컴포넌트 나누어야 함. 나중에 수정

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaPostNav from "@/components/nav/QnaPostNav";
import subjects from "@/lib/subjects";
import SubjectSearchInput from "@/components/board/question/SubjectSearchInput";
import QnaPostRewardModal from "@/components/board/question/post/QnaPostRewardModal";
import QnaPostJiJeongTagModal from "@/components/board/question/post/QnaPostJiJeongTagModal";
import QnaPostFileUpload from "@/components/board/question/post/QnaPostFileUpload";
import YeopjeonTag from "@/components/board/tags/YeopjeonTag";
import postNewQna from "@/apis/question/postNewQna";

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

  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isJiJeongTagModalOpen, setIsJiJeongTagModalOpen] = useState(false);
  const mediaAllowedTypes = ["image/jpeg", "image/png"];

  // 로컬 스토리지에 저장하는 함수
  const saveToLocalStorage = () => {
    localStorage.setItem("qnaPostFormData", JSON.stringify(formData));
    alert("임시저장 되었습니다!");
  };
  // 로컬 스토리지에서 데이터를 불러오는 함수
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("qnaPostFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  };
  // 컴포넌트가 로드될 때 로컬 스토리지 데이터를 불러오기
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // 커스텀 태그 추가 함수
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if ((e.key === "Enter" || e.key === "Tab") && tagInput.trim()) {
      e.preventDefault(); // 기본 동작 막기
      const newTag = tagInput.trim();

      // 유효한 태그 조건 확인
      if (newTag.length <= 10 && formData.customTags.length < 4 && !formData.customTags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          customTags: [...prev.customTags, newTag],
        }));
      }

      // tagInput을 비동기적으로 초기화해, 키 입력 처리와 상태 초기화 사이의 타이밍 문제 해결.
      setTimeout(() => setTagInput(""), 0);
    }
  };
  // 태그 입력 값 변경 함수
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTagInput(e.target.value.trim());
  };
  // 태그 삭제 함수
  const removeTag = (tag: string): void => {
    setFormData(prev => ({
      ...prev,
      customTags: prev.customTags.filter(t => t !== tag),
    }));
  };

  const toggleRewardModal = () => {
    setIsRewardModalOpen(!isRewardModalOpen);
  };

  const toggleJiJeongTagModal = () => {
    setIsJiJeongTagModalOpen(!isJiJeongTagModalOpen);
  };

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

  // 파일 업데이트 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const filteredFiles = filesArray.filter(file => mediaAllowedTypes.includes(file.type));

      if (filteredFiles.length !== filesArray.length) {
        alert("JPEG 또는 PNG 형식의 파일만 업로드할 수 있습니다.");
        e.target.value = ""; // 선택한 파일 무효화(올바르지 않은 파일 형식일 경우)
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

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 제목에 공백만 입력된 경우 확인
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!formData.content.trim()) {
      alert("질문을 입력해주세요. (공백만 입력할 수 없습니다)");
      return;
    }
    if (!subjects.includes(formData.subject)) {
      alert("정확한 교과목명을 입력하세요.");
      return;
    }

    if (isFormValid) {
      try {
        await postNewQna(formData); // API 호출
        alert("Q&A 게시글이 성공적으로 등록되었습니다.");
        localStorage.removeItem("qnaPostFormData"); // 로컬 스토리지의 임시저장 데이터 삭제
        window.location.href = "/board/question"; // 작성 완료 후 이동할 페이지로 변경
      } catch (error) {
        console.log("error", error);
        alert("게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("모든 필수 항목을 채워주세요.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <QnaPostNav onSave={saveToLocalStorage} />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white p-5">
        <div className="rounded-lg">
          <form>
            {/* 제목 */}
            <label htmlFor="title" className="mb-[26px] block">
              <div className="relative">
                <span className="font-pretendard-semibold mr-1.5 text-lg">제목</span>
                <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
                <input
                  type="text"
                  name="title"
                  placeholder="제목(20자 이하)"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={20} // 최대 글자수 제한 설정
                  required
                  className="font-pretendard-medium mt-3 w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base"
                />
                <span className="absolute right-2 mt-8 -translate-y-1/2 transform text-xs text-gray-500">
                  {formData.title.length} /20자
                </span>
              </div>
            </label>

            {/* 질문 */}
            <label htmlFor="content" className="mb-[26px] block">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-pretendard-semibold mr-1.5 text-lg">질문</span>
                  <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
                </div>
                <span className="text-sm text-gray-500">{formData.content.length} / 2000자</span>
              </div>
              <textarea
                name="content"
                placeholder="질문을 작성해주세요.(2000자 이하)"
                value={formData.content}
                onChange={handleChange}
                maxLength={2000} // 최대 글자수 제한 설정
                required
                className="font-pretendard-medium mt-3 h-40 w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base"
              />
            </label>

            {/* 파일 업로드 */}
            <div className="mb-[26px] block">
              <span className="font-pretendard-semibold mr-1.5 text-lg">파일</span>
              <QnaPostFileUpload
                mediaFiles={formData.mediaFiles}
                onFileChange={handleFileChange}
                onFileDelete={handleFileDelete}
              />
            </div>

            {/* 교과목명 검색 */}
            <div className="mb-[26px] block">
              <div className="mb-3">
                <span className="font-pretendard-semibold mr-1.5 text-lg">교과목명 검색</span>
                <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
              </div>
              <SubjectSearchInput value={formData.subject} onChange={handleSubjectChange} />
            </div>

            {/* 정적 태그 */}
            <div
              role="button"
              tabIndex={0} // Focus 가능하도록 설정. 에러 수정
              className="mb-[26px] flex cursor-pointer items-center"
              onClick={toggleJiJeongTagModal}
              onKeyDown={e => e.key === "Enter" && toggleJiJeongTagModal()}
            >
              <span className="font-pretendard-semibold mr-[14px] text-lg"> 정적 태그 {">"}</span>
              <div className="flex flex-wrap gap-1.5">
                {formData.questionPresetTags.map(tag => (
                  <span
                    key={tag}
                    className="font-pretendard-bold rounded-full bg-custom-blue-500 px-3 py-1 text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 엽전 현상금 */}
            <button type="button" className="mb-[26px] flex cursor-pointer items-center" onClick={toggleRewardModal}>
              <div className="font-pretendard-semibold mr-[14px] text-lg"> 엽전 현상금 {">"}</div>
              <YeopjeonTag point={formData.reward} />
            </button>

            {/* 커스텀 태그 */}
            <label htmlFor="customTags" className="mb-[26px] block">
              <span className="font-pretendard-semibold mr-1.5 text-lg"> 커스텀 태그</span>
              <span className="font-pretendard-medium text-base text-[#F46B01]"> 10자 이하, 4개 이하</span>
              {/* 태그 리스트 */}
              <div className="mb-4 mt-1 flex flex-wrap gap-1.5">
                {formData.customTags.map(tag => (
                  <span
                    key={tag}
                    className="font-pretendard-bold flex items-center rounded-full bg-[#5ED513] px-3 text-xs text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-base font-bold text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="customTags"
                  placeholder="Tab,Enter로 구분해 태그를 입력해주세요."
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  maxLength={10} // 최대 10자 제한
                  className="w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base placeholder:text-sm"
                />
                {/* 글자 수 표시 */}
                <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
                  {tagInput.length} /10자
                </span>
              </div>
            </label>

            {/* 추가 설정 */}
            <label htmlFor="isPrivate" className="mb-[26px] block">
              <div className="font-pretendard-semibold mb-2 text-lg"> 추가 설정</div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleIsPrivate}
                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${
                    formData.isPrivate ? "bg-custom-blue-500" : "bg-gray-300"
                  }`}
                  aria-pressed={formData.isPrivate}
                >
                  {formData.isPrivate && (
                    <svg
                      className="h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="font-pretendard-medium text-base text-[#9B9B9B]">내 정보 비공개</span>
              </div>
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full rounded-md p-2 text-white ${isFormValid ? "bg-custom-blue-500" : "bg-[#E2E2E2]"}`}
            >
              작성완료
            </button>
          </form>

          {/* 모달들 */}
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
        </div>
      </div>
    </div>
  );
}
