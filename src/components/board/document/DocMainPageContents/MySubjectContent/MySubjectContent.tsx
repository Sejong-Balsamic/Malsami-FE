import DocMovingCard from "../../DocMovingCard";

export default function MySubjectContent({ subject }: { subject: string }) {
  return (
    <div className="mb-10">
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <p className="font-pretendard-semibold text-lg text-custom-blue-500">내 전공 관련 자료</p>
          <p className="font-pretendard-semibold text-xs text-[#737373]">{subject}</p>
        </div>
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
