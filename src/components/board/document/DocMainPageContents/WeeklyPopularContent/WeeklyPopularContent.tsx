import DocCard from "../../DocCard";

export default function WeeklyPopularContent() {
  return (
    <div className="mb-10">
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">주간 인기글</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
      </div>
      <DocCard
        subject="인터렉티브디자인"
        title="인터 오늘"
        content="오늘 인터렉티브 수업 못 갔는데 수업 내용 정리해 주실 분 있나요?"
        tag="강의_자료"
        createdDate="43분 전"
        thumbnailUrl=""
        viewCount={14}
        likeCount={3}
      />
      <DocCard
        subject="기초3D그래픽스"
        title="3D 오브젝트 텍스처 질문"
        content="오브젝트에 텍스처를 적용했는데 자꾸 왜곡돼요."
        tag="질문"
        createdDate="1시간 전"
        thumbnailUrl=""
        viewCount={22}
        likeCount={5}
      />{" "}
    </div>
  );
}
