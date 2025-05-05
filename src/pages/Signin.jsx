import { useState } from "react";
import { Link } from "react-router-dom";
import Litera from "../assets/Litera.png";
import Sign_in from "../assets/sign_in.png";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeIcon as EyeIconSolid } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/outline"; // Perbaikan: menggunakan versi yang sama
import { EyeSlashIcon as EyeSlashSolid } from "@heroicons/react/24/solid"; // Perbaikan: menggunakan versi solid

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isEyeHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen min-w-full flex color-white">   
      <div className="max-w-[50%] min-h-screen bg-warm-sand-3 w-full flex flex-col items-center justify-center">
        <img src={Litera} alt="Litera" className="mb-24" />
        <img src={Sign_in} alt="Sign in" className="max-w-3/4 w-full h-auto"/>
      </div>   
      
      <div className="max-w-[50%] w-full bg-white flex flex-col mt-5 ml-5">
        <div 
          className="flex w-fit items-center font-lato text-charcoal-gray-1 text-md hover:cursor-pointer hover:text-charcoal-gray-5 transition-colors duration-300" 
          onClick={handleBack}
        >
          <ArrowLeftIcon className="w-8 h-8 mr-2"/> 
          <span>Back to Home</span>
        </div>
      
        <div className="flex flex-col items-center py-10 w-full">
          <div className="font-merriweather font-bold text-center mb-8">
            <h2 className="text-5xl font-bold text-gray-900">
              Sign In
            </h2>
          </div>
          <form className="font-lato space-y-6 w-full max-w-lg" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-medium font-medium text-gray-700 w-full"
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
                className="mt-1 block w-full px-3 py-2 border border-charcoal-gray-2 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-dark"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-medium font-normal text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 border border-charcoal-gray-2 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-dark"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  isEyeHovered ? (
                    <EyeSlashSolid
                      className="h-6 w-6 text-charcoal-gray-5 cursor-pointer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-6 w-6 text-charcoal-gray-2 cursor-pointer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                ) : (
                  isEyeHovered ? (
                    <EyeIconSolid
                      className="h-6 w-6 text-charcoal-gray-5 cursor-pointer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeIcon
                      className="h-6 w-6 text-charcoal-gray-2 cursor-pointer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                )}
                </div>
              </div>
            </div>
            <Button 
              text={"Sign in"}
              className="w-full flex justify-center py-2 mt-28 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-deep-mocha-brown-3 bg-warm-sand-4 hover:bg-light transition hover:text-deep-mocha-brown-7"
            />
          </form>
          <div className="mt-6">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm mt-2">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account?
            </span>
            <Link 
              to="/signup"
              className="no-underline font-medium text-warm-sand-5 hover:text-warm-sand-7 transition-colors duration-300"
            > 
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}