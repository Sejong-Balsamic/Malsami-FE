import { apiClient } from "../clients/appClient";

export default async function getFacultyQNAs() {
  const formData = new FormData();
  formData.append("pageNumber", "0"); // 기본값 0
  formData.append("pageSize", "30"); // 기본값 30

  try {
    const response = await apiClient.post("/api/questions/get/all/no-answer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.questionPosts.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
// // mock data, 나중에 api폴더에서 직접 호출해야함.
// const getFacultyQNAs = [
//   {
//     postId: 1,
//     title: "이거 교수님이 뭐라고 말씀하셨는지 기억하는사람있어없어어어어어어",
//     color: "#F46B02",
//     subject: "K-MOOC: 인공지능 콘텐츠아트프로듀싱",
//     JiJeongTags: ["조언 구함", "자료 요청"],
//     rewardYeopjeon: 100,
//     likeCount: 25,
//     commentCount: 12,
//   },
//   {
//     postId: 2,
//     title: "디자인예술대학",
//     color: "#03B89E",
//     subject: "과학사",
//     JiJeongTags: ["강의 요청", "플러그인 설치"],
//     rewardYeopjeon: 150,
//     likeCount: 40,
//     commentCount: 8,
//   },
//   {
//     postId: 3,
//     title: "이거 교수님이 뭐라고 말씀하셨는지 기억하는사람있어없어어어어어어",
//     color: "#F46B02",
//     subject: "K-MOOC: 인공지능 콘텐츠아트프로듀싱",
//     JiJeongTags: ["조언 구함", "자료 요청"],
//     rewardYeopjeon: 100,
//     likeCount: 25,
//     commentCount: 12,
//   },
//   {
//     postId: 4,
//     title: "디자인예술대학",
//     color: "#03B89E",
//     subject: "과학사",
//     JiJeongTags: ["강의 요청", "플러그인 설치"],
//     rewardYeopjeon: 150,
//     likeCount: 40,
//     commentCount: 8,
//   },
//   {
//     postId: 5,
//     title: "이거 교수님이 뭐라고 말씀하셨는지 기억하는사람있어없어어어어어어",
//     color: "#F46B02",
//     subject: "K-MOOC: 인공지능 콘텐츠아트프로듀싱",
//     JiJeongTags: ["조언 구함", "자료 요청"],
//     rewardYeopjeon: 100,
//     likeCount: 25,
//     commentCount: 12,
//   },
//   {
//     postId: 6,
//     title: "디자인예술대학",
//     color: "#03B89E",
//     subject: "과학사",
//     JiJeongTags: ["강의 요청", "플러그인 설치"],
//     rewardYeopjeon: 150,
//     likeCount: 40,
//     commentCount: 8,
//   },
//   {
//     postId: 7,
//     title: "이거 교수님이 뭐라고 말씀하셨는지 기억하는사람있어없어어어어어어",
//     color: "#F46B02",
//     subject: "K-MOOC: 인공지능 콘텐츠아트프로듀싱",
//     JiJeongTags: ["조언 구함", "자료 요청"],
//     rewardYeopjeon: 100,
//     likeCount: 25,
//     commentCount: 12,
//   },
//   {
//     postId: 8,
//     title: "디자인예술대학",
//     color: "#03B89E",
//     subject: "과학사",
//     JiJeongTags: ["강의 요청", "플러그인 설치"],
//     rewardYeopjeon: 150,
//     likeCount: 40,
//     commentCount: 8,
//   },
//   {
//     postId: 9,
//     title: "이거 교수님이 뭐라고 말씀하셨는지 기억하는사람있어없어어어어어어",
//     color: "#F46B02",
//     subject: "K-MOOC: 인공지능 콘텐츠아트프로듀싱",
//     JiJeongTags: ["조언 구함", "자료 요청"],
//     rewardYeopjeon: 100,
//     likeCount: 25,
//     commentCount: 12,
//   },
//   {
//     postId: 10,
//     title: "디자인예술대학",
//     color: "#03B89E",
//     subject: "과학사",
//     JiJeongTags: ["강의 요청", "플러그인 설치"],
//     rewardYeopjeon: 150,
//     likeCount: 40,
//     commentCount: 8,
//   },
// ];

// export default getFacultyQNAs;
