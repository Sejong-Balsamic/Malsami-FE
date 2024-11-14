"use client";

import { useState } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaPostNav from "@/components/nav/QnaPostNav";

interface FormData {
  title: string;
  content: string;
  subject: string;
  customTags: string;
  questionPresetTags: string[];
  reward: number;
  isPrivate: boolean;
}

export default function QnaPostPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    subject: "",
    customTags: "",
    questionPresetTags: [],
    reward: 0,
    isPrivate: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

    setIsFormValid(checkFormValidity());
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
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
      <div className="bg-gray-white p-5">
        <ScrollToTopOnLoad />

        <div className="rounded-lg">
          <form>
            <label htmlFor="title" className="mb-4 block">
              제목 (필수)
              <input
                type="text"
                name="title"
                placeholder="질문있어요~"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="content" className="mb-4 block">
              질문 (필수)
              <textarea
                name="content"
                placeholder="질문을 작성해주세요.(2000자 이하)"
                value={formData.content}
                onChange={handleChange}
                required
                className="mt-2 h-24 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="subject" className="mb-4 block">
              교과목명 검색 (필수)
              <input
                type="text"
                name="subject"
                placeholder="교과목명을 입력하세요."
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="questionPresetTags" className="mb-4 block">
              정적 태그 {">"}
              <input
                type="text"
                name="questionPresetTags"
                placeholder="질문있어요~ㄴ"
                value={formData.questionPresetTags}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="reward" className="mb-4 block">
              엽전 현상금 {">"}
              <input
                type="number"
                name="reward"
                placeholder="질문있어요~"
                value={formData.reward}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="customTags" className="mb-4 block">
              커스텀 태그
              <input
                type="text"
                name="customTags"
                placeholder="Tab,Enter로 구분해 태그를 입력해주세요."
                value={formData.customTags}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border p-2"
              />
            </label>

            <label htmlFor="isPrivate" className="mb-4 block items-center">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="mr-2"
              />
              <span>내 정보 비공개</span>
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
        </div>
      </div>
    </>
  );
}

/* <div className="mb-6 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={maxRewardYeopjeon}
                    value={isChaeTaek}
                    onChange={e => setRewardYeopjeon(Number(e.target.value))}
                    className="custom-slider mr-4 w-full"
                    style={{
                      background: `linear-gradient(to right, #03B89E ${(isChaeTaek / maxRewardYeopjeon) * 100}%, #D9D9D9 ${(isChaeTaek / maxRewardYeopjeon) * 100}%)`,
                    }}
                  />
                  <span className="font-semibold text-black">{isChaeTaek}</span>
                </div> */
