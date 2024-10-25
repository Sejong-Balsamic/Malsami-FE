// import { apiClient } from "../clients/appClient";

// // 전체 질문 목록을 가져오는 함수
// export const getAllQuestions = async () => {
//   try {
//     const response = await apiClient.post("/api/questions/get/all");
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error("질문 목록을 가져오는 중 오류 발생:", error);
//     throw error;
//   }
// };
// api연동 필요필요

// 목 데이터 생성

const questionData = [
  {
    questionPostId: 1,
    assignedTags: ["지정태그", "지정태그12"],
    title: "React에서 상태 관리하는 법",
    content: "React에서 상태 관리는 어떻게 하나요?",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-25T02:53:43.934Z",
    viewCount: 100,
    likeCount: 20,
    commentCount: 5,
    rewardYeopjeon: 150,
  },
  {
    questionPostId: 2,
    assignedTags: ["지정태그2", "지정태그"],
    title: "Next.js로 SEO 최적화하기",
    content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-24T10:30:00.000Z",
    viewCount: 200,
    likeCount: 50,
    commentCount: 10,
  },
  {
    questionPostId: 3,
    assignedTags: ["지정태그", "지정태그12"],
    title: "React에서 상태 관리하는 법",
    content: "React에서 상태 관리는 어떻게 하나요?",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-25T02:53:43.934Z",
    viewCount: 100,
    likeCount: 20,
    commentCount: 5,
    rewardYeopjeon: 1000,
  },
  {
    questionPostId: 4,
    assignedTags: ["지정태그2", "지정태그"],
    title: "Next.js로 SEO 최적화하기",
    content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-24T10:30:00.000Z",
    viewCount: 200,
    likeCount: 50,
    commentCount: 10,
  },
  {
    questionPostId: 5,
    assignedTags: ["지정태그", "지정태그12"],
    title: "React에서 상태 관리하는 법",
    content: "React에서 상태 관리는 어떻게 하나요?",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-25T02:53:43.934Z",
    viewCount: 100,
    likeCount: 20,
    commentCount: 5,
  },
  {
    questionPostId: 6,
    assignedTags: ["지정태그2", "지정태그"],
    title: "Next.js로 SEO 최적화하기",
    content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
    thumbnail: "/image/PartyPopper.jpg",
    createdDate: "2024-10-24T10:30:00.000Z",
    viewCount: 200,
    likeCount: 50,
    commentCount: 10,
  },
];

export default questionData;
