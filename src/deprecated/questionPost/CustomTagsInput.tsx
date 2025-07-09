// interface CustomTagsProps {
//   tags: string[];
//   onClick: () => void;
//   onRemoveTag: (tag: string) => void;
// }

// export default function CustomTagsInput({ tags, onClick, onRemoveTag }: CustomTagsProps) {
//   return (
//     <div className="mb-[26px] block">
//       <button className="font-pretendard-semibold text-lg" onClick={onClick} type="button">
//         {" "}
//         커스텀 태그 {">"}
//       </button>
//       <div className="mb-4 mt-1 flex flex-wrap gap-1.5">
//         {tags.map(tag => (
//           <span
//             key={tag}
//             className="font-pretendard-bold flex items-center rounded-full bg-[#5ED513] px-3 text-xs text-white"
//           >
//             {tag}
//             <button type="button" onClick={() => onRemoveTag(tag)} className="ml-2 text-base font-bold text-white">
//               &times;
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
