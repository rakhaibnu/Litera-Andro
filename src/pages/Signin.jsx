import { useState } from "react";
import { Link } from "react-router-dom";
import Litera from "../assets/Litera.png";
import Sign_in from "../assets/sign_in.png";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { UseNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = UseNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  const handleBack = () => {
    navigate("/Index"); 
  };

  return (
    <div className="min-h-screen min-w-full flex color-white">   
      <div className="max-w-[50%] min-h-screen bg-warm-sand-3 w-full flex flex-col items-center justify-center">
        <img src={Litera} alt="Litera" className="mb-24" />
        <img src={Sign_in} alt="Sign in" className="max-w-2xl w-full h-auto"/>
      </div>   
      
      <div className="max-w-[50%] w-full bg-white flex flex-col mt-5 ml-5">
        <div className="flex items-center font-lato text-charcoal-gray-5 text-xl hover:font-bold cursor-pointer mb-5" 
        onClick={(handleBack)}>
          <ArrowLeftIcon className="w-10 h-10 mr-2 "/> 
          <span >Back to Home</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="font-merriweather font-bold text-center mb-8 ">
            <h2 className=" text-5xl font-bold text-gray-900">Sign In</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 w-full"
              >
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-dark focus:border-dark"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-2xl focus:outline-none focus:ring-dark focus:border-dark"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-dark focus:ring-dark border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-dark hover:text-light"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark hover:bg-light hover:text-dark transition"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
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
    </div>
  );
}