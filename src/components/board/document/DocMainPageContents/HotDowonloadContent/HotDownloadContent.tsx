import DocMovingCard from "../../DocMovingCard";

export default function HotDownloadContent() {
  return (
    <div className="mb-10">
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">HOT 다운로드</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="flex flex-row gap-x-2.5">
        <DocMovingCard color="#00C49A" subject="기초3D그래픽스" title="C4D 옥테인 플러그인 어떻게 넣어요?" />
        <DocMovingCard
          color="#F46B01"
          subject="K-MOOC: 인공지능 콘텐츠아트프로듀싱dlfjsldfjsldfj"
          title="C4D 옥테인 플러그인 어떻게 넣어요?ㅕㅗㅓㅇㄴ러닐ㄴ"
        />
      </div>
    </div>
  );
}
