import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h3 className="mb-4 text-2xl font-bold">페이지를 찾을 수 없습니다.</h3>
      <p className="mb-8 text-lg text-gray-600">The page you are looking for does not exist.</p>
      <a href="/" className="rounded bg-custom-blue-400 px-4 py-2 text-white hover:bg-custom-blue-500">
        홈 화면 바로가기
      </a>
    </div>
  );
}
