import Regcard from "./RegCard";

export default function RegisterCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Regcard />
      </div>
    </div>
  );
}