import { useState } from "react";
import { Link } from "react-router-dom";
import Litera from "../assets/Litera.png";
import Sign_in from "../assets/SignUp.png";
import Button from "../components/Button";
import { FormField } from "../components/FormField";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
  };

  return (
    <div className="min-h-screen min-w-full flex color-white">
      <div className="max-w-[50%] min-h-screen bg-warm-sand-3 w-full flex flex-col items-center justify-center">
        <img src={Litera} alt="Litera" className="mb-16" />
        <img src={Sign_in} alt="Sign in" className="max-w-3/4 w-full h-auto mb-5" />
      </div>

      <div className="flex flex-col items-center py-10 w-full">
        <div className="font-merriweather font-bold text-center mb-6">
          <h2 className="text-5xl font-bold text-gray-900">Sign Up</h2>
        </div>
        <div className="flex flex-col items-center py-4 w-full">
          <form
            className="font-lato space-y-3 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <FormField
              id="name"
              label="Name"
              type="text"
              autoComplete="text"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
              isEyeHovered={isEyeHovered}
              handleEyeMouseEnter={() => setIsEyeHovered(true)}
              handleEyeMouseLeave={() => setIsEyeHovered(false)}
            />
            <Button
              text={"Sign Up"}
              className="w-full flex justify-center py-2 mt-28 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-deep-mocha-brown-3 bg-warm-sand-4 hover:bg-light transition hover:text-deep-mocha-brown-7"
            />
          </form>
          <div className="mt-6">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm mt-2">
            <span className="px-2 bg-white text-gray-500">
              Already have an Account?
            </span>
            <Link
              to="/Signin"
              className="no-underline font-medium text-warm-sand-5 hover:text-warm-sand-7 transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}