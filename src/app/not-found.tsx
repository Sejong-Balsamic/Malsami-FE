import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back to Home
      </a>
    </div>
  );
}
