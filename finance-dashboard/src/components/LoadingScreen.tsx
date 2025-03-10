export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </h2>
      </div>
    </div>
  );
}
