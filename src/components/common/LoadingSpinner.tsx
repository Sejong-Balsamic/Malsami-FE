export default function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-custom-blue-500"></div>
    </div>
  );
}
