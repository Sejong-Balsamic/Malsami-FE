// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
//
// interface AllQuestionProps {
//   questions: QuestionPost[];
// }
//
// function AllQuestion({ questions }: AllQuestionProps) {
//   const router = useRouter();
//
//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };
//
//   return (
//     <div className="z-0 w-full pb-[176px] pt-[100px]">
//       <div className="mb-[14px] flex w-full items-center justify-between">
//         <span className="font-pretendard-semibold text-[18px]">전체 질문 게시판</span>
//         <button type="button" className="flex items-center gap-1" onClick={() => handleNavigation("/board/question")}>
//           <span className="font-pretendard-medium text-[14px] text-[#03B8A3]">더보기 </span>
//           <Image src="/icons/Move.svg" alt="Mypage" width={7} height={14} />
//         </button>
//       </div>
//       <div className="font-pretendard-medium w-full rounded-[20px] border border-gray-100 bg-white px-[14px] py-[22px] text-[14px] shadow-lg shadow-gray-200">
//         <div className="relative grid w-full grid-cols-2 grid-cols-[1fr_2fr] grid-rows-5 gap-[15px]">
//           {questions.map(qna => (
//             <React.Fragment key={qna.questionPostId}>
//               <div
//                 className="flex cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap"
//                 onClick={() => handleNavigation(`/board/question/detail/${qna.questionPostId}`)}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") {
//                     handleNavigation(`/board/question/detail/${qna.questionPostId}`);
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//               >
//                 {qna.subject}
//               </div>
//               <div
//                 className="flex cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap text-[#727272]"
//                 onClick={() => handleNavigation(`/board/question/detail/${qna.questionPostId}`)}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") {
//                     handleNavigation(`/board/question/detail/${qna.questionPostId}`);
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//               >
//                 {qna.content}
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default AllQuestion;
