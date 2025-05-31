import { Star, KeyRound, UserRound, LogOut, CircleUser } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FormField } from '../components/FormField';

export default function Profile() {
  const [name, setName] = useState('Salman Ibnu');
  const [email, setEmail] = useState('salak@gmail.com');

  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row justify-center items-start mt-10 min-h-[80vh]">
        {/* Sidebar */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-8 mt-10 w-[370px] rounded-[20px] min-h-[747px] justify-between items-center">
          <div>
            <ul className="space-y-6 w-full">
              <li className="mb-2">
                <Link to="/profile">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg">
                        <UserRound /> Profile
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-white text-black font-normal justify-start text-left hover:bg-[#f7ede2] transition"
                  />
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/favorites">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg justify-center">
                        <Star /> Favourite
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-[#f7ede2] text-black font-normal justify-start text-left"
                  />
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/security">
                  <Button
                    text={
                      <span className="flex items-center gap-2 text-lg just">
                        <KeyRound /> Security
                      </span>
                    }
                    className="w-full border border-[#C6A986] rounded-[8px] py-2 px-4 bg-white text-black font-normal justify-start text-left hover:bg-[#f7ede2] transition"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <Button
            text={
              <span className="flex items-center gap-2 text-lg justify-center">
                <LogOut /> Logout
              </span>
            }
            className="w-1/2 mt-10 bg-[#D97D74] hover:bg-[#b85e56] text-white border-none rounded-[8px] py-2 px-4 justify-center"
          />
        </div>
        {/* Main Content */}
        <div className="flex flex-col border border-[#C6A986] m-10 p-10 mt-10 w-[730px] rounded-[20px] min-h-[650px] bg-white">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-merriweather text-5xl font-bold mb-4">
              Favourite
            </h3>
            <CircleUser size={120} className="mx-auto" />
          </div>
          <form className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <FormField
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              text="Edit Profile"
              className="w-fit border border-black bg-white text-black rounded-[8px] px-6 py-2 mt-2"
            />
          </form>
          <hr className="my-8 border-gray-400" />
          <div className="flex gap-8 justify-center mt-4">
            <div className="flex flex-col items-center border border-gray-400 rounded-[12px] px-10 py-6 bg-white w-[220px]">
              <span className="text-3xl font-bold">3</span>
              <span className="text-lg text-gray-700 mt-1">Reviewed Book</span>
            </div>
            <div className="flex flex-col items-center border border-gray-400 rounded-[12px] px-10 py-6 bg-white w-[220px]">
              <span className="text-3xl font-bold">5</span>
              <span className="text-lg text-gray-700 mt-1">Favourite Book</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
