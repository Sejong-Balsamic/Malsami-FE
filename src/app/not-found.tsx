import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-8 text-lg text-gray-600">The page you are looking for does not exist.</p>
      <a href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Go Back to Home
      </a>
    </div>
  );
}
