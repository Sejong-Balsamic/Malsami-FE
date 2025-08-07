// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
//
// interface AllDocumentProps {
//   documents: DocumentPost[];
// }
//
// function AllDocument({ documents }: AllDocumentProps) {
//   const router = useRouter();
//
//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };
//
//   return (
//     <div className="z-0 w-full pb-[176px] pt-[100px]">
//       <div className="mb-[14px] flex w-full items-center justify-between">
//         <span className="font-pretendard-semibold text-[18px]">전체 자료 게시판</span>
//         <button type="button" className="flex items-center gap-1" onClick={() => handleNavigation("/board/document")}>
//           <span className="font-pretendard-medium text-[14px] text-[#03B8A3]">더보기 </span>
//           <Image src="/icons/Move.svg" alt="Mypage" width={7} height={14} />
//         </button>
//       </div>
//       <div className="font-pretendard-medium w-full rounded-[20px] border border-gray-100 bg-white px-[14px] py-[22px] text-[14px] shadow-lg shadow-gray-200">
//         <div className="relative grid w-full grid-cols-[1fr_2fr] grid-rows-5 gap-[15px]">
//           {documents.map(doc => (
//             <React.Fragment key={doc.documentPostId}>
//               <div
//                 className="flex cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap"
//                 onClick={() => handleNavigation(`/board/document/detail/${doc.documentPostId}`)}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") {
//                     handleNavigation(`/board/document/detail/${doc.documentPostId}`);
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//               >
//                 {doc.subject}
//               </div>
//               <div
//                 className="flex cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap text-[#727272]"
//                 onClick={() => handleNavigation(`/board/document/detail/${doc.documentPostId}`)}
//                 onKeyDown={e => {
//                   if (e.key === "Enter") {
//                     handleNavigation(`/board/document/detail/${doc.documentPostId}`);
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//               >
//                 {doc.content}
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default AllDocument;
