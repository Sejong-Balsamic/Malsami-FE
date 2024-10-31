// // src/components/NavBar.tsx
// import { useState } from "react";

// function QuestionNavBar({ onSelect }: { onSelect: (selection: string) => void }) {
//   const [selected, setSelected] = useState("전체");

//   const handleSelect = (option: string) => {
//     setSelected(option);
//     onSelect(option); // 부모 컴포넌트에서 전달된 onSelect 함수를 호출
//   };

//   return (
//     <div className="flex justify-between bg-white p-4 shadow-md">
//       <button
//         type="button"
//         className={`flex-1 p-2 text-center font-pretendard-bold ${selected === "전체" ? "border-b-2 border-custom-green-500" : "border-b-2 border-gray-300"}`}
//         onClick={() => handleSelect("전체")}
//       >
//         전체
//       </button>
//       <button
//         type="button"
//         className={`flex-1 p-2 text-center font-pretendard-bold ${selected === "소프트웨어융합" ? "border-b-2 border-custom-green-500" : "border-b-2 border-gray-300"}`}
//         onClick={() => handleSelect("소프트웨어융합")}
//       >
//         소프트웨어융합
//       </button>
//     </div>
//   );
// }

// export default QuestionNavBar;
// src/components/NavBar.tsx

import { useState } from "react";
import facultys from "@/lib/facultys";

function QuestionNavBar({ onSelect }: { onSelect: (selection: string) => void }) {
  const [selected, setSelected] = useState("전체");
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsShowOptions(false);
  };

  return (
    <div className="flex flex-col bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <button
          type="button"
          className={`flex-1 p-2 text-center font-pretendard-bold ${
            selected === "전체" ? "border-b-2 border-custom-green-500" : "border-b-2 border-gray-300"
          }`}
          onClick={() => handleSelect("전체")}
        >
          전체
        </button>
        <div className="relative flex-1">
          <button
            type="button"
            className={`w-full p-2 text-center font-pretendard-bold ${
              selected !== "전체" ? "border-b-2 border-custom-green-500" : "border-b-2 border-gray-300"
            }`}
            onClick={() => setIsShowOptions(!isShowOptions)}
          >
            {selected !== "전체" ? selected : "대양휴머니티칼리지"}
          </button>
          {isShowOptions && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md">
              {facultys.map(faculty => (
                <button
                  key={faculty}
                  type="button"
                  className="w-full p-2 text-left hover:bg-gray-100"
                  onClick={() => handleSelect(faculty)}
                >
                  {faculty}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionNavBar;
