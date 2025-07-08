// interface JiJeongTagInputProps {
//   tags: string[];
//   onOpenModal: () => void;
// }

// export default function JiJeongTagInput({ tags, onOpenModal }: JiJeongTagInputProps) {
//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       className="mb-[26px] cursor-pointer"
//       onClick={onOpenModal}
//       onKeyDown={e => e.key === "Enter" && onOpenModal()}
//     >
//       {/* 정적 태그 제목 */}
//       <div className="font-pretendard-semibold mb-2.5 text-lg">정적 태그 {">"}</div>

//       {/* 태그 리스트 */}
//       <div className="flex flex-wrap gap-1.5">
//         {tags.map(tag => (
//           <span key={tag} className="font-pretendard-bold rounded-full bg-custom-blue-500 px-3 py-1 text-xs text-white">
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
