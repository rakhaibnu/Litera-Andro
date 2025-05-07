import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Litera from "../assets/Litera.png";
import Sign_in from "../assets/sign_in.png";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password }); // Tempatkan logic autentikasi di sini
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side */}
      <div className="w-1/2 bg-warm-sand-3 flex flex-col items-center justify-center p-10">
        <img src={Litera} alt="Litera" className="mb-20" />
        <img src={Sign_in} alt="Sign in" className="w-full max-w-2xl h-auto" />
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 bg-white flex flex-col p-10">
        {/* Back Button */}
        <div
          onClick={handleBack}
          className="flex items-center text-charcoal-gray-5 text-xl font-lato hover:font-bold cursor-pointer mb-8"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-2" />
          <span>Back to Home</span>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-bold text-gray-900 text-center font-merriweather mb-10">
          Sign In
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark focus:border-dark"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark focus:border-dark"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-900">
              <input
                type="checkbox"
                name="remember-me"
                className="h-4 w-4 text-dark focus:ring-dark border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <Link to="/forgot-password" className="text-sm font-medium text-dark hover:text-light">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark hover:bg-light hover:text-dark transition"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Redirect */}
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/signup"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
