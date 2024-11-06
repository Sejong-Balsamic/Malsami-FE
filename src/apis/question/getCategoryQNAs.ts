import { apiClient } from "../clients/appClient";

export default async function getCategoryQNAs() {
  const formData = new FormData();
  formData.append("pageNumber", "0"); // 기본값 0
  formData.append("pageSize", "30"); // 기본값 30

  try {
    const response = await apiClient.post("/api/questions/get/all", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.questionPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}

// // 목 데이터 생성
// const CategoryQNAs = [
//   {
//     questionPostId: 1,
//     assignedTags: ["지정태그", "지정태그12"],
//     title: "React에서 상태 관리하는 법",
//     content: "React에서 상태 관리는 어떻게 하나요?",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-25T02:53:43.934Z",
//     viewCount: 100,
//     likeCount: 20,
//     commentCount: 5,
//     rewardYeopjeon: 150,
//   },
//   {
//     questionPostId: 10,
//     assignedTags: ["지정태그", "지정태그12"],
//     title: "React에서 상태 관리하는 법",
//     content: "React에서 상태 관리는 어떻게 하나요?",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-25T02:53:43.934Z",
//     viewCount: 100,
//     likeCount: 20,
//     commentCount: 5,
//     rewardYeopjeon: 0,
//   },
//   {
//     questionPostId: 2,
//     assignedTags: ["지정태그2", "지정태그"],
//     title: "Next.js로 SEO 최적화하기",
//     content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-24T10:30:00.000Z",
//     viewCount: 200,
//     likeCount: 50,
//     commentCount: 10,
//     rewardYeopjeon: 150,
//   },
//   {
//     questionPostId: 3,
//     assignedTags: ["지정태그", "지정태그12"],
//     title: "React에서 상태 관리하는 법",
//     content: "React에서 상태 관리는 어떻게 하나요?",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-25T02:53:43.934Z",
//     viewCount: 100,
//     likeCount: 20,
//     commentCount: 5,
//     rewardYeopjeon: 1000,
//   },
//   {
//     questionPostId: 4,
//     assignedTags: ["지정태그2", "지정태그"],
//     title: "Next.js로 SEO 최적화하기",
//     content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-24T10:30:00.000Z",
//     viewCount: 200,
//     likeCount: 50,
//     commentCount: 10,
//     rewardYeopjeon: 150,
//   },
//   {
//     questionPostId: 5,
//     assignedTags: ["지정태그", "지정태그12"],
//     title: "React에서 상태 관리하는 법",
//     content: "React에서 상태 관리는 어떻게 하나요?",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-25T02:53:43.934Z",
//     viewCount: 100,
//     likeCount: 20,
//     commentCount: 5,
//     rewardYeopjeon: 150,
//   },
//   {
//     questionPostId: 6,
//     assignedTags: ["지정태그2", "지정태그"],
//     title: "Next.js로 SEO 최적화하기",
//     content: "Next.js를 이용한 SEO 최적화 방법에 대해 알고 싶습니다.",
//     thumbnail: "/image/PartyPopper.jpg",
//     createdDate: "2024-10-24T10:30:00.000Z",
//     viewCount: 200,
//     likeCount: 50,
//     commentCount: 10,
//     rewardYeopjeon: 150,
//   },
// ];

// export default CategoryQNAs;
