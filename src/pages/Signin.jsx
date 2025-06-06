import { useState } from 'react';
import { Link } from 'react-router-dom';
import Litera from '../assets/Litera.png';
import Sign_in from '../assets/sign_in.png';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;

      if (data.success) {
        // Store the token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        
        // Show success message
        alert('Login successful!');
        
        // Navigate to home page
        navigate('/');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    }
};

  return (
    <div className="min-h-screen min-w-full flex color-white">
      <div className="max-w-[50%] min-h-screen bg-warm-sand-3 w-full flex flex-col items-center justify-center">
        <img src={Litera} alt="Litera" className="mb-24" />
        <img src={Sign_in} alt="Sign in" className="max-w-3/4 w-full h-auto" />
      </div>

      <div className="max-w-[50%] w-full bg-white flex flex-col mt-5 ml-5">
        <div className="pl-5 mb-5">
          <div
            className="flex w-fit items-center font-lato text-charcoal-gray-1 text-md hover:cursor-pointer hover:text-charcoal-gray-5 transition-colors duration-300"
            onClick={handleBack}
          >
            <ArrowLeftIcon className="w-8 h-8 mr-2 flex-shrink-0" />
            <span>Back to Home</span>
          </div>
        </div>
        <div className="flex flex-col items-center py-10 w-full">
          <div className="font-merriweather font-bold text-center mb-8">
            <h2 className="text-5xl font-bold text-gray-900">Sign In</h2>
          </div>
          <form
            className="font-lato space-y-6 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

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
              autoComplete="current-password"
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
              type="submit"
              text={'Sign in'}
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
