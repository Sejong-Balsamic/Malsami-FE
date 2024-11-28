// "use client";

// import LoginForm from "@/components/login/LoginForm";
// import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <ScrollToTopOnLoad />
//       <div className="flex min-h-screen w-full min-w-[386px] max-w-[640px] flex-col items-center bg-white p-10">
//         <h1 className="font-pretendard-bold mb-[4rem] text-center text-2xl">세종말싸미</h1>
//         <LoginForm />
//       </div>
//     </div>
//   );
// }
"use client";

import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white px-10 py-12">
        <h1 className="font-pretendard-bold mb-2 text-center text-2xl">세종말싸미</h1>
        <div className="mb-6 text-center text-sm text-gray-600">세종대학교 포털의 학번과 비밀번호로 로그인하세요</div>
        <LoginForm />
      </div>
    </div>
  );
}
