export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white space-x-64">
      <div
        className="w-12 h-12 rounded-full animate-spin
                        border-x-4 border-solid border-green-500 border-t-transparent shadow-md"
      ></div>
    </div>
  );
}
