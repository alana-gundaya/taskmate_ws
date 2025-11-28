import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const registerResponse = await axios.post("auth/register/", formData);
      
      if (registerResponse.status === 201) {
        setMessage("Registration successful! Please log in.");
        // Wait a moment then redirect to login
        setTimeout(() => {
          navigate("/login", { 
            state: { 
              username: formData.username,
              message: "Registration successful! Please log in with your credentials." 
            } 
          });
        }, 1500);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 tracking-tight">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         transition-colors duration-200"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
                         text-sm font-semibold text-white bg-red-600 hover:bg-red-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                         transition-all duration-200 shadow-sm hover:shadow"
              >
                Create Account
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-4 text-center p-3 rounded-lg ${
              message.includes("successful") 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}>
              {message}
            </div>
          )}
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
