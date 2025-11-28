import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
      <div className="text-center text-white p-8 max-w-2xl">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in tracking-tight">TaskMate</h1>
        <p className="text-xl mb-8 text-gray-100 tracking-wide">Your Personal Task Management Solution</p>
        <Link 
          to="/login" 
          className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold 
                     hover:bg-gray-50 transition-all duration-300 inline-block
                     shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}