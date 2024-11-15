"use client";

// 컴포넌트 나누어야 함. 나중에 수정

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaPostNav from "@/components/nav/QnaPostNav";
import subjects from "@/lib/subjects";
import SubjectSearchInput from "@/components/board/question/SubjectSearchInput";
import QnaPostRewardModal from "@/components/board/question/post/QnaPostRewardModal";
import QnaPostJiJeongTagModal from "@/components/board/question/post/QnaPostJiJeongTagModal";
import YeopjeonTag from "@/components/board/tags/YeopjeonTag";

interface QnaPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags: string[];
  questionPresetTags: string[];
  reward: number;
  isPrivate: boolean;
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
  });

  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isJiJeongTagModalOpen, setIsJiJeongTagModalOpen] = useState(false);

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

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (!subjects.includes(formData.subject)) {
      alert("정확한 교과목명을 입력하세요.");
      return;
    }

    if (isFormValid) {
      // API 통신 로직을 추가
      console.log("폼 제출:", formData);
    } else {
      alert("모든 필수 항목을 채워주세요.");
    }
  };
  return (
    <>
      <QnaPostNav />
      <ScrollToTopOnLoad />
      <div className="bg-gray-white p-5">
        <div className="rounded-lg">
          <form>
            <label htmlFor="title" className="mb-[26px] block">
              <span className="font-pretendard-semibold mr-1 text-lg">제목</span>
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
            </label>

            {/* 질문 */}
            <label htmlFor="content" className="mb-[26px] block">
              <span className="font-pretendard-semibold mr-1 text-lg">질문</span>
              <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
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

            {/* 교과목명 검색 */}
            <div className="mb-[26px] block">
              <div className="mb-3">
                <span className="font-pretendard-semibold mr-1 text-lg">교과목명 검색</span>
                <span className="font-pretendard-medium text-lg text-custom-blue-500">(필수)</span>
              </div>
              <SubjectSearchInput value={formData.subject} onChange={handleSubjectChange} />
            </div>

            {/* 정적 태그 */}
            <div
              role="button"
              tabIndex={0} // Focus 가능하도록 설정. 에러 수정
              className="mb-[26px] block cursor-pointer"
              onClick={toggleJiJeongTagModal}
              onKeyDown={e => e.key === "Enter" && toggleJiJeongTagModal()}
            >
              <span className="font-pretendard-semibold mr-2 text-lg"> 정적 태그 {">"}</span>
              <div className="mt-2 flex flex-wrap gap-1">
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
            <button type="button" className="mb-[26px] flex cursor-pointer flex-col" onClick={toggleRewardModal}>
              <div className="font-pretendard-semibold mr-2 text-lg"> 엽전 현상금 {">"}</div>
              <YeopjeonTag point={formData.reward} />
            </button>

            {/* 커스텀 태그 */}
            <label htmlFor="customTags" className="mb-[26px] block">
              <span className="font-pretendard-semibold mr-1 text-lg"> 커스텀 태그</span>
              <span className="font-pretendard-medium text-base text-[#F46B01]"> 10자 이하, 4개 이하</span>
              {/* 태그 리스트 */}
              <div className="mb-4 mt-1 flex flex-wrap gap-1">
                {formData.customTags.map(tag => (
                  <span
                    key={tag}
                    className="font-pretendard-bold flex items-center rounded-full bg-[#F46B01] px-3 py-1 text-xs text-white"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 font-semibold text-white">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                name="customTags"
                placeholder="Tab,Enter로 구분해 태그를 입력해주세요."
                value={tagInput}
                onChange={handleTagInputChange} // 값을 변경할 때 호출
                onKeyDown={handleTagInputKeyDown} // 수정한 함수 적용
                className="w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base"
              />
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
    </>
  );
}
